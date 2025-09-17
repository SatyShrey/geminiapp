
import { useValues } from "../components/ValueProvider";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';
const validationSchema = Yup.object({
    email: Yup.string().email("Please enter valid email").required("Please enter your email"),
    password: Yup.string().min(4).required("Please enter password"),
})
const initialValues = {
    email: "",
    password: "",
}

export default function LoginScreen({ goto }) {
    const { setloading, setuser, seterror, setsuccess, } = useValues();
    const login = (values) => {
        setloading(true)
        axios.post("/api/login", { email: values.email, password: values.password }, { withCredentials: true }).then(data => {
            setloading(false);
            if (data.data === "Invalid credentials") { return seterror(data.data) }
            setsuccess(data.data.message);
            setuser(data.data.user);
            localStorage.setItem('user', JSON.stringify(data.data.user))
        }).catch(err => { seterror(err.message); setloading(false) })
    }

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => { login(values) }
    });

    return <form onSubmit={handleSubmit}
        className=" bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <h2 className="font-bold text-xl text-center">Login</h2>

        <input className="input mt-2" type="email" name="email" onBlur={handleBlur} onChange={handleChange} value={values.email}
        /><small className="text-red-600 text-center" >{errors.email}</small>

        <input className="input mt-2" type="password" name="password" onBlur={handleBlur} onChange={handleChange} value={values.password}
        /><small className="text-red-600 text-center" >{errors.password}</small>

        <button className="btn btn-neutral mt-4 block w-full" type="submit" >Login</button>
        <button className="btn btn-link block m-auto" type="reset" onClick={goto}>Go to signup page</button>
    </form>
}
