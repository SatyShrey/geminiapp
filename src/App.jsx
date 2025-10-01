import Dashboard from "./Pages/Dashboard";
import Header from "./components/Header";
import Protected from "./components/Protected";
import Login from "./Pages/Login";
import Drawer from "./components/Drawer";
import InputBox from "./components/InputBox";
import Modals from "./components/Modals";
import { useEffect } from "react";

export default function App() {

  useEffect(() => {
      window.visualViewport.addEventListener('resize', () => {
         document.getElementById('app').style.height = `${window.visualViewport.height}px`;
      });
   }, [])

  return (
    <div id="app" className="h-dvh flex flex-col bg-base-100/90 overflow-hidden max-w-3xl mx-auto">
        <Header />
        <Login />
        <Protected><Dashboard /></Protected>
        <Protected><InputBox/></Protected>
        <Protected><Drawer/></Protected>
        <Modals/>
    </div>
  )
}
