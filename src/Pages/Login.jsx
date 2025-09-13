import { useState } from "react";
import { useValues } from "../components/ValueProvider";
import axios from "axios";

export default function Login() {
    const { setloading, setuser, seterror, setsuccess, url, user } = useValues();
    if (user) { return null }
    const [isLoginScreen, setisLoginScreen] = useState(true)

    const goto = async () => {
        setisLoginScreen((prev) => !prev)
    }

    function LoginScreen() {
        const [email, setemail] = useState('');
        const [password, setpassword] = useState('');

        const login = (e) => {
            e.preventDefault()
            if (!email || !password) { return seterror("Value can not be empty") }
            setloading(true)
            axios.post(url + "login", { email, password },{withCredentials:true}).then(data => {
                if (data && data.data && data.data.user) {
                    const loginUser = data.data.user;
                    setuser(loginUser);
                    localStorage.setItem("user", JSON.stringify(loginUser))
                    setloading(false); setsuccess("Login success")
                } else { seterror(data.data); setloading(false) }
            }).catch(err => { seterror(err.message); setloading(false) })
        }

        return <form onSubmit={login}
            className=" bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <h2 className="font-bold text-xl text-center">Login</h2>

            <input onChange={(e) => setemail(e.target.value)} type="email" value={email} className="input mt-2" placeholder="Email" />

            <input onChange={(e) => setpassword(e.target.value)} type="password" value={password} className="input mt-2" placeholder="Password" />

            <button className="btn btn-neutral mt-4 block w-full" type="submit" >Login</button>
            <button className="btn btn-link block m-auto" type="reset" onClick={goto}>Go to signup page</button>
        </form>
    }

    function SignupScreen() {
        const [email, setemail] = useState('');
        const [name, setname] = useState('');
        const [password, setpassword] = useState('');

        const signup = (e) => {
            e.preventDefault()
            setloading(true)
            axios.post(url + "signup", { name, email, password }).then(data => {
                if (data.data === "success") { setsuccess("Signup success"); setloading(false) }
                else { seterror(data.data); setloading(false) }
            }).catch(err => { seterror(err.message); setloading(false) })
        }

        return <form onSubmit={signup}
            className="bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <h2 className=" font-bold text-xl text-center">Signup</h2>

            <input onChange={(e) => setname(e.target.value)} type="text" value={name} className="mt-2 input" placeholder="Name" />

            <input onChange={(e) => setemail(e.target.value)} type="email" value={email} className="mt-2 input" placeholder="Email" />

            <input onChange={(e) => setpassword(e.target.value)} type="password" value={password} className="mt-2 input" placeholder="Password" />

            <button className="btn btn-neutral mt-4 block w-full" type="submit" >Signup</button>
            <button className="btn btn-link block w-full" type="reset" onClick={goto}>Go to login page</button>
        </form>
    }

    return <div className="h-full flex justify-center items-center">
        {isLoginScreen ? <LoginScreen /> : <SignupScreen />}
    </div>
}
