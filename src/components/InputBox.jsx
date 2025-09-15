import { useState } from "react"
import { BiSolidSend } from "react-icons/bi";
import { useValues } from "./ValueProvider";
import axios from "axios";

export default function InputBox() {
    const [prompt, setprompt] = useState();
    const { url, setloading, seterror, setcurrentChat, setuser } = useValues();

    function autoLogout(){
        localStorage.clear();
        setuser(null);
        seterror("Login expired")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setloading(true);
        axios.post(url + "gemini", { prompt }, { withCredentials: true }).then(data => {
             setloading(false);
             if(data.data==="Server error"){return seterror(data.data)}
             if(data.data==="Login expired"){return autoLogout()}
             setcurrentChat({ user: prompt, bot: data.data, id: Date.now() });
             e.target.reset();
        }).catch(err => {seterror(err.message);setloading(false)})
    }

    return (
        <div className="p-1 shadow-[0_0_2px]">
            <form onSubmit={handleSubmit}
                className='flex w-full items-center p-2 rounded overflow-hidden shadow-[0_0_2px]'>
                <textarea className='h-full resize-none w-full border-none outline-none'
                    onChange={(e) => setprompt(e.target.value)} placeholder="Ask anything..."></textarea>
                {prompt && <button type="submit"><BiSolidSend size={30} /></button>}
            </form>
        </div>
    )
}
