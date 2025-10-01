
import { useValues } from "../components/ValueProvider";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import * as Yup from 'yup';
const validationSchema = Yup.object({
    email: Yup.string().email("Please enter valid email").required("Please enter your email"),
    password: Yup.string().min(4).required("Please enter password"),
})
const initialValues = {
    email: "",
    password: "",
}
//login screen
export default function LoginScreen({ goto }) {
    const { setloading, setuser, } = useValues();
    const [secure, setseure] = useState(true)
    const login = (values) => {
        setloading(true)
        axios.post("/api/login", { email: values.email, password: values.password }, { withCredentials: true }).then(data => {
            setloading(false);
            if (data.data === "Invalid credentials") { return toast.error(data.data) }
            toast.success(data.data.message);
            setuser(data.data.user);
            localStorage.setItem('user', JSON.stringify(data.data.user))
        }).catch(err => { toast.error(err.message); setloading(false) })
    }

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => { login(values) }
    });

    return <form onSubmit={handleSubmit}
        className=" bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <h2 className="font-bold text-xl text-center">Login</h2>

        <input className="block w-full shadow-[0_0_2px] rounded h-10 p-2 mt-2 placeholder:text-gray-500"
            placeholder="Email"
            type="email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email}
        /><small className="text-red-600 text-center" >{errors.email}</small>

        <div className="relative">
            <input className="block w-full shadow-[0_0_2px] rounded h-10 p-2 mt-2 placeholder:text-gray-500"
                placeholder="Password"
                type={secure ? "password" : "text"} name="password" onBlur={handleBlur} onChange={handleChange} value={values.password}
            />{values.password && <button type="button" onClick={() => setseure((prev) => !prev)}
                className="btn btn-sm absolute right-0.5 top-0.5"> {secure ? <Eye size={16}/> : <EyeSlash size={16} />} </button>}
        </div>
        <small className="text-red-600 text-center" >{errors.password}</small>
        <button className="btn btn-neutral mt-4 block w-full" type="submit" >Login</button>
        <button className="btn btn-link block m-auto" type="reset" onClick={goto}>Go to signup page</button>
    </form>
}
