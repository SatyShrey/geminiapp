import { useValues } from "../components/ValueProvider";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import * as Yup from 'yup';
const validationSchema = Yup.object({
    name: Yup.string().min(2).required("Please enter your name"),
    email: Yup.string().email("Please enter valid email").required("Please enter your email"),
    password: Yup.string().min(4).required("Please enter password"),
    cpassword: Yup.string().oneOf([Yup.ref("password")], "Password not matched!").required("Please confirm password")
})
const initialValues = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
}
export default function SignupScreen({ goto }) {

    const { setloading, } = useValues();
    const [secure, setseure] = useState(true)
    const [secure2, setseure2] = useState(true)

    const signup = (values) => {
        setloading(true)
        axios.post("/api/signup", { name: values.name, email: values.email, password: values.password }).then(data => {
            setloading(false)
            if (data.data === "Signup success") { return toast.success(data.data); }
            toast.error(data.data);
        }).catch(err => { toast.error(err.message); setloading(false) })
    }

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => { signup(values) }
    });

    return <form onSubmit={handleSubmit}
        className="bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <h2 className=" font-bold text-xl text-center">Signup</h2>

        <input className="block w-full shadow-[0_0_2px] rounded h-10 p-2 mt-2 placeholder:text-gray-500"
            placeholder="Name"
            type="text" name="name" onBlur={handleBlur} onChange={handleChange} value={values.name}
        /><small className="text-red-600 text-center" >{errors.name}</small>

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

        <div className="relative">
            <input className="block w-full shadow-[0_0_2px] rounded h-10 p-2 mt-2 placeholder:text-gray-500"
            placeholder="Confirm password"
            type={secure2 ? "password" : "text"} name="cpassword" onBlur={handleBlur} onChange={handleChange} value={values.cpassword}
        />{values.cpassword && <button type="button" onClick={() => setseure2((prev) => !prev)}
                        className="btn btn-sm absolute right-0.5 top-0.5"> {secure2 ? <Eye size={16}/> : <EyeSlash size={16} />} </button>}
        </div>
        <small className="text-red-600 text-center" >{errors.cpassword}</small>

        <button className="btn btn-neutral mt-4 block w-full" type="submit" >Signup</button>
        <button className="btn btn-link block w-full" type="reset" onClick={goto}>Go to login page</button>
    </form>
}