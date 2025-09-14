import { useState } from "react";
import { useValues } from "../components/ValueProvider";
import axios from "axios";
export default function LoginScreen({goto}) {
    const { setloading, setuser, seterror, setsuccess, url, user } = useValues();
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

            <input onChange={(e) => setemail(e.target.value.toLowerCase())} type="email" value={email} className="input mt-2" placeholder="Email" />

            <input onChange={(e) => setpassword(e.target.value)} type="password" value={password} className="input mt-2" placeholder="Password" />

            <button className="btn btn-neutral mt-4 block w-full" type="submit" >Login</button>
            <button className="btn btn-link block m-auto" type="reset" onClick={goto}>Go to signup page</button>
        </form>
    }
