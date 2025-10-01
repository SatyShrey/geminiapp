import { useEffect, useState } from "react"
import { BiSolidSend } from "react-icons/bi";
import { useValues } from "./ValueProvider";
import axios from "axios";
import { toast } from "react-toastify";

export default function InputBox() {
    const [prompt, setprompt] = useState();
    const { setloading, setcurrentChat, setuser } = useValues();

    function autoLogout() {
        localStorage.clear();
        setuser(null);
        toast.error("Login expired")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prompt) { return }
        setloading(true);
        axios.post("/api/gemini", { prompt }, { withCredentials: true }).then(data => {
            setloading(false);
            if (data.data === "Server error") { return toast.error(data.data) }
            if (data.data === "Login expired") { return autoLogout() }
            setcurrentChat({ user: prompt, bot: data.data, id: Date.now() });
            e.target.reset(); setprompt('')
        }).catch(err => { toast.error(err.message); setloading(false) })
    }

    useEffect(() => {
        const input = document.getElementById('myInput');
        //input.focus({ preventScroll: true });
        input.addEventListener("focus",(e)=>{
            e.preventDefault();
        })
    }, [])

    return (
        <div className="p-1 shadow-[0_0_2px] bg-base-200">
            <form onSubmit={handleSubmit}
                className='flex w-full items-center p-2 rounded overflow-hidden shadow-[0_0_2px] bg-base-100'>
                <textarea id="myInput" className='h-full resize-none w-full border-none outline-none'
                    onChange={(e) => setprompt(e.target.value)} placeholder="Ask anything..."></textarea>
                {prompt && <button className="cursor-pointer hover:scale-110" type="submit"><BiSolidSend size={30} /></button>}
            </form>
        </div>
    )
}
