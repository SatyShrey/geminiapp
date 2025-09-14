import { useState } from "react"
import { BiSolidSend } from "react-icons/bi";
import { useValues } from "./ValueProvider";
import axios from "axios";

export default function InputBox() {
    const [prompt, setprompt] = useState();
    const { url, setloading,seterror,setcurrentChat,setuser } = useValues();
    function sendPrompt(prompt) {
        setloading(true);
        axios.post(url + "gemini", { prompt },{withCredentials:true}).then(data => {
            setloading(false)
            if (data && data.data && data.data.response) {
                setcurrentChat({user:prompt,bot:data.data.response,id:Date.now()});
            }else if(data.data==="jwt expired" || data.data==="Unauthorized!"){
                localStorage.clear();
                setuser(null);
                seterror("Login expired please login again");
            }
            else { seterror(() => typeof (data.data) === "string" ? data.data : "Unknown error"); }
        }).catch(e => { setloading(false); seterror(e.message)})
    }
    return (
        <div className="p-1 shadow-[0_0_2px] sticky bottom-0">
            <form onSubmit={(e)=>{e.preventDefault();sendPrompt(prompt)}}
                className='flex w-full items-center p-2 rounded overflow-hidden shadow-[0_0_2px]'>
                <textarea className='h-full resize-none w-full border-none outline-none'
                    onChange={(e) => setprompt(e.target.value)} placeholder="Ask anything..."></textarea>
                {prompt && <button type="submit"><BiSolidSend size={30} /></button>}
            </form>
        </div>
    )
}
