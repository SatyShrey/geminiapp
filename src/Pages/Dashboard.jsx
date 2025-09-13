import { useEffect, useRef } from "react"
import { useValues } from "../components/ValueProvider"
import Typed from "typed.js"
import { BiSave } from "react-icons/bi";

export default function Dashboard() {
    const { user, currentChat, saveMessage } = useValues()
    const el = useRef();

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [`Hello ${user.name}`, 'Welcome to My_Gemini_lemo'],
            typeSpeed: 50,
            showCursor: false,
        });

        return () => typed.destroy(); // Clean up on unmount
    }, []);

    return (
        <div className="mt-10 p-2 h-full">
            {(currentChat && currentChat.bot && currentChat.user) ? <>
                <div className="flex justify-center">
                    <button onClick={saveMessage} className="btn">Save<BiSave size={25} /></button>
                </div>
                <div>
                    <pre className="m-1 float-right clear-both whitespace-pre-wrap font-semibold">{currentChat.user}</pre>
                    <pre className="m-1 float-left clear-both whitespace-pre-wrap">{currentChat.bot}</pre>
                </div>
            </>
                : <div>
                    <span ref={el} className="text-bold font-bold text-2xl">Hello {user.name}</span>
                    <span className="animate-ping text-2xl">|</span>
                </div>
            }
        </div>
    )
}
