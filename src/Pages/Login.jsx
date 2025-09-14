import { useState } from "react";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import { useValues } from "../components/ValueProvider";

export default function Login() {
    const { user } = useValues();
    if (user) { return null }
    const [isLoginScreen, setisLoginScreen] = useState(true)

    const goto = async () => {
        setisLoginScreen((prev) => !prev)
    }

    
   

    return <div className="h-full flex justify-center items-center">
        {isLoginScreen ? <LoginScreen goto={goto} /> : <SignupScreen goto={goto} />}
    </div>
}
