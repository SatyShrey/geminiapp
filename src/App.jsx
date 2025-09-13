import Dashboard from "./Pages/Dashboard";
import Header from "./components/Header";
import Protected from "./components/Protected";
import Login from "./Pages/Login";
import Drawer from "./components/Drawer";
import InputBox from "./components/InputBox";
import Modals from "./components/Modals";

export default function App() {
  return (
    <div className="h-dvh flex flex-col relative w-3xl max-w-full m-auto shadow-[0_0_1px] overflow-hidden">
        <Header />
        <Login />
        <Protected><Dashboard /></Protected>
        <Protected><InputBox/></Protected>
        <Protected><Drawer/></Protected>
        <Modals/>
    </div>
  )
}
