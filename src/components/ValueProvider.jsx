import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const Contexts = createContext();

export default function ValueProvider({ children }) {
    const [user, setuser] = useState(null);
    const [messages, setmessages] = useState([]);
    const [currentChat, setcurrentChat] = useState({});
    const [error, seterror] = useState(null);
    const [success, setsuccess] = useState(null);
    const [loading, setloading] = useState(null);
    const resolveConfirm = useRef(null);
    const [text, settext] = useState(null);
    const url = import.meta.env.VITE_GEMINI_BACKEND;//"https://gemini-backend-hwxx.onrender.com/"
    const [showModal, setshowModal] = useState(false)
    //confirm fuction
    function customConfirm(text) {
        settext(text);
        return new Promise((resolve) => {
            resolveConfirm.current = resolve;
        });
    }
    //get local storage data and get verified
    function getVerified() {
        const user= localStorage.getItem("user");
        if (user) { setuser(JSON.parse(user)) }
       else{ setuser({name:"Satya",email:"satya@gmail.com"}) }
        const messages = localStorage.getItem("messages");
        if (messages) { setmessages(JSON.parse(messages)) }
    }
    useEffect(() => {
        getVerified();
    }, [])
    //save messages
    const saveMessage = () => {
        if (!currentChat || !currentChat.bot || !currentChat.user || !currentChat.id) {
            return seterror("Invalid message")
        }
        const isSaved = messages.find(f => f.id === currentChat.id)
        if (isSaved) { return seterror("Message already saved") }
        const newList = [...messages, currentChat];
        setmessages(newList);
        localStorage.setItem("messages", JSON.stringify(newList));
        setsuccess("Message saved");
    }
    //delete messges
    const deleteMessage = async (id) => {
        const conFirm = await customConfirm("Are you sure to delete?")
        if (conFirm) {
            const newList = messages.filter(message => id !== message.id);
            setmessages(newList);
            localStorage.setItem("messages", JSON.stringify(newList));
            setsuccess("Message deleted")
        }
    }

    async function logout() {//logout
        const conFirm = await customConfirm("Are you sure to logout?");
        if (conFirm) {
            setloading(true)
            setshowModal(false)
            axios.post(url + "logout", {}, { withCredentials: true }).then((data) => {
                setloading(false);
                localStorage.clear();
                setuser(null);
                setsuccess(data.data)
            }).catch(e => { setloading(false);seterror(e.message); })
        }
    }

    return <Contexts.Provider value={{
        setuser, user, messages, setmessages, currentChat, setcurrentChat, error, seterror, success, setsuccess, loading, setloading, customConfirm, text, settext, resolveConfirm, url, showModal, setshowModal, saveMessage, deleteMessage, logout,
    }}>
        {children}
    </Contexts.Provider>
}

export const useValues = () => useContext(Contexts);