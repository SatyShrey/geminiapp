 import { useState } from "react";
import { useValues } from "../components/ValueProvider";
import axios from "axios";
 export default function SignupScreen({goto}) {
    
        const { setloading, setuser, seterror, setsuccess, url, user } = useValues();
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

            <input onChange={(e) => setemail(e.target.value.toLowerCase())} type="email" value={email} className="mt-2 input" placeholder="Email" />

            <input onChange={(e) => setpassword(e.target.value)} type="password" value={password} className="mt-2 input" placeholder="Password" />

            <button className="btn btn-neutral mt-4 block w-full" type="submit" >Signup</button>
            <button className="btn btn-link block w-full" type="reset" onClick={goto}>Go to login page</button>
        </form>
    }