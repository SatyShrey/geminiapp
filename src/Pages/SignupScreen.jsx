import { useValues } from "../components/ValueProvider";
import axios from "axios";
import { useFormik } from "formik";
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

    const { setloading, seterror, setsuccess, } = useValues();

    const signup = (values) => {
        setloading(true)
        axios.post("/api/signup", { name:values.name, email:values.email, password:values.password }).then(data => {
            setloading(false)
            if (data.data === "Signup success") { return setsuccess(data.data); }
            seterror(data.data);
        }).catch(err => { seterror(err.message); setloading(false) })
    }

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => { signup(values) }
    });

    return <form onSubmit={handleSubmit}
        className="bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <h2 className=" font-bold text-xl text-center">Signup</h2>

        <input className="input mt-2"
            type="text" name="name" onBlur={handleBlur} onChange={handleChange} value={values.name}
        /><small className="text-red-600 text-center" >{errors.name}</small>

        <input className="input mt-2"
            type="email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email}
        /><small className="text-red-600 text-center" >{errors.email}</small>

        <input className="input mt-2"
            type="password" name="password" onBlur={handleBlur} onChange={handleChange} value={values.password}
        /><small className="text-red-600 text-center" >{errors.password}</small>

        <input className="input mt-2"
            type="password" name="cpassword" onBlur={handleBlur} onChange={handleChange} value={values.cpassword}
        /><small className="text-red-600 text-center" >{errors.cpassword}</small>

        <button className="btn btn-neutral mt-4 block w-full" type="submit" >Signup</button>
        <button className="btn btn-link block w-full" type="reset" onClick={goto}>Go to login page</button>
    </form>
}