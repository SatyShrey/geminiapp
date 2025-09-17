import { useEffect, useState } from "react"
import { useValues } from "./ValueProvider"
import { BiPowerOff } from "react-icons/bi";

export default function Drawer() {
    const { showModal, setshowModal, messages, deleteMessage, logout, setcurrentChat } = useValues();
    const [left, setLeft] = useState("-100%");
    useEffect(() => {
        if (showModal) {
            setLeft("0%")
        } else { setLeft("-100%"); }
    }, [showModal])
    return (
            <div className="flex z-10 transition-all absolute top-0 bottom-0 duration-500 w-full" style={{ left }}>
                <div className="h-full w-[80%] backdrop-blur-2xl shadow-2xl flex flex-col">
                    <nav className="flex justify-between ">
                        <span></span>
                        <span className="font-semibold text-2xl m-1">Messages</span>
                        <button className="btn btn-sm btn-circle m-1" onClick={logout}><BiPowerOff size={25} /></button>
                    </nav>
                    <div className="h-full w-full">
                        {messages && messages.map(message => <div key={message.id} className="flex w-full items-center p-1">
                            <p onClick={() => { setshowModal(false); setcurrentChat(message) }}
                                className="w-full text-ellipsis whitespace-nowrap overflow-hidden">{message.user}</p>
                            <button onClick={() => deleteMessage(message.id)}
                                className="btn btn-error btn-sm">Delete</button>
                        </div>)}
                    </div>
                </div>
                <div className="c2 w-[20%]" onClick={() => setshowModal(false)} />
            </div>
    )
}
