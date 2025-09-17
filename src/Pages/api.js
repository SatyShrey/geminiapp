import dotenv from "dotenv";
import express from "express"
import serverless from "serverless-http"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
//environment variable
dotenv.config();
const constr = process.env.VITE_CON_STR;
const SECRET_KEY = process.env.VITE_SECRET_KEY;
const API_KEY = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use((req, res) => {
  res.status(404).send("🔍 Route not found in Express");
});

mongoose.connect(constr);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("Users", userSchema);

//default page
app.get("/", (req, res) => {
  res.send("✅ Netlify Function is alive!");
});

// **Signup Route**
app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  const isExist = await User.findOne({ email });
  if (isExist) { return res.send("User already exists"); }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword });
  res.send("Signup success");
});

// **Login Route**
app.post("/login", async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  const user = await User.findOne({ email });
  if (!user) { return res.send("Invalid credentials"); }
  const isMatch = await bcrypt.compare(password, user.password); // ✅ await here
  if (!isMatch) { return res.send("Invalid credentials"); }
  const logUser = { id: user._id, name: user.name, email: user.email }
  const token = jwt.sign(logUser, SECRET_KEY, { expiresIn: "30d" });
  res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,sameSite:"none",
      maxAge: 30 * 24 * 60 * 60 * 1000 
    });
  res.json({ message: "Login successful", user: logUser });
});

// **Logout Route**
app.post("/logout", async (req, res) => {
  res.clearCookie("authToken", { httpOnly: true, secure: true, sameSite: "none" });
  res.send('You are logged out')
});

//**Gemini API Route**/
app.post("/gemini", async (req, res) => {
  try {
    const token = req.cookies.authToken;
    jwt.verify(token, SECRET_KEY);
  } catch (err) { return res.send('Login expired') }
  try {
    const { prompt } = req.body
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
    const result = await model.generateContent(prompt);
    const reply = result.response.text();
    res.send(reply)
  } catch (err) { res.send('Server error') }
})

export const handler = serverless(app);