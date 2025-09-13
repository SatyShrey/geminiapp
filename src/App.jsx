import Dashboard from "./Pages/Dashboard";
import Header from "./components/Header";
import Protected from "./components/Protected";
import Login from "./Pages/Login";
import Drawer from "./components/Drawer";
import InputBox from "./components/InputBox";

export default function App() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full flex-col shadow-[0_0_2px] w-3xl max-w-full m-auto overflow-hidden relative">
        <Header />
        <Login />
        <Protected><Dashboard /></Protected>
        <Protected><InputBox/></Protected>
        <Protected><Drawer/></Protected>
      </div>
    </div>
  )
}
