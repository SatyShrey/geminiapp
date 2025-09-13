
import { useEffect, useState } from "react";
import { useValues } from "./ValueProvider";

export default function Modals() {
    const { error, seterror, success, setsuccess, loading, resolveConfirm, text, settext } = useValues();
    const [errorBottom, seterrorBottom] = useState("-50%");
    const [successBottom, setsuccessBottom] = useState("-50%");
    const [loadingBottom, setloadingBottom] = useState("-50%");
    const [confirmBottom, setconfirmBottom] = useState("-50%");

    useEffect(()=>{
        if(error){seterrorBottom("0%")}
        else(seterrorBottom("-50%"))
    },[error])

    useEffect(()=>{
        if(success){setsuccessBottom("0%")}
        else(setsuccessBottom("-50%"))
    },[success])

     useEffect(()=>{
        if(loading){setloadingBottom("0%")}
        else(setloadingBottom("-50%"))
    },[loading])

    useEffect(()=>{
        if(text){setconfirmBottom("0%")}
        else(setconfirmBottom("-50%"))
    },[text])


    function handleConfirm(choice) {
        resolveConfirm.current(choice);
        settext(false)
    }

    return (
        <> {(loading || error || success || text) &&
            <div className=" absolute top-0 bottom-0 left-0 right-0 backdrop-blur-[2px]"></div>}

            <div className=" absolute left-1 right-1 rounded-tr-2xl rounded-tl-2xl max-h-[50vh] overflow-x-scroll shadow-[0_0_1px] flex flex-col gap-3 p-2 items-center pb-10 bg-base-100" style={{ bottom:errorBottom, scrollbarWidth: "none", }}>
                <h3 className="font-bold text-lg text-red-600">Error</h3>
                <span className="text-error text-xl">{typeof (error) === "string" ? error : ""}</span>
                <button onClick={() => seterror(null)}
                    className="btn btn-error">Ok</button>

            </div>

            <div className=" absolute left-1 right-1 rounded-tr-2xl rounded-tl-2xl max-h-[50vh] overflow-x-scroll shadow-[0_0_1px] flex flex-col gap-3 p-2 items-center pb-10 bg-base-100" style={{ bottom: successBottom, scrollbarWidth: "none", }}>
                <h3 className="font-bold text-lg text-green-600">Success</h3>
                <span className="text-success text-xl min-h-4">{typeof (success) === "string" ? success : "..."}</span>
                <button onClick={() => setsuccess(null)}
                    className="btn btn-success">Ok</button>

            </div>
            <div className=" absolute left-1 right-1 rounded-tr-2xl rounded-tl-2xl max-h-[50vh] overflow-x-scroll shadow-[0_0_1px] flex flex-col gap-3 p-2 items-center pb-10 bg-base-100" style={{ bottom: loadingBottom, scrollbarWidth: "none", }}>
                <h3 className=" text-lg text-center">Please wait...</h3>
                <div className="text-center">
                    <span className="loading loading-bars"></span>
                </div>

            </div>
            <div className=" absolute left-1 right-1 rounded-tr-2xl rounded-tl-2xl max-h-[50vh] overflow-x-scroll shadow-[0_0_1px] flex flex-col gap-3 p-2 items-center pb-10 bg-base-100" style={{ bottom: confirmBottom, scrollbarWidth: "none", }}>
                <h3 className="font-bold text-lg">Confirm</h3>
                <span className="text-warning text-xl min-h-4">{typeof (text) === "string" ? text : "Are you sure?"}</span>
                <div>
                    <button onClick={() => handleConfirm(true)}
                        className="btn">Yes</button>
                    <button onClick={() => handleConfirm(false)}
                        className="btn ms-2">No</button>
                </div>

            </div>
        </>
    )
}
