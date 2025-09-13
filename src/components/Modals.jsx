import { useEffect, } from "react"
import { useValues } from "./ValueProvider";

export default function Modals() {
    const { error, seterror, success, setsuccess, loading, resolveConfirm, text } = useValues();

    useEffect(() => {//handle loading bars
        if (loading) {
            document.getElementById("my_modal_loading").showModal();
        } else { document.getElementById("my_modal_loading").close(); }
    }, [loading])

    useEffect(() => {//handle error message
        if (error) {
            document.getElementById("my_modal_error").showModal();
        }
    }, [error])

    useEffect(() => {//handle success message
        if (success) {
            document.getElementById("my_modal_success").showModal();
        }
    }, [success])

    function handleConfirm(choice) {
        resolveConfirm.current(choice);
    }

    return (
        <>
            <dialog  //showw error message
                id="my_modal_error" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-600">Error</h3>
                    <span className="text-error text-xl">{typeof(error)==="string" ? error : ""}</span>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={() => seterror(null)}
                                className="btn btn-error">Ok</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog //this shows success message
                id="my_modal_success" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-green-600">Success</h3>
                    <span className="text-success text-xl min-h-4">{typeof(success)==="string" ? success : "..."}</span>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={() => setsuccess(null)}
                                className="btn btn-success">Ok</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog //this shows loading bars
                id="my_modal_loading" className="modal">
                <div className="modal-box">
                    <h3 className=" text-lg text-center">Please wait...</h3>
                    <div className="text-center">
                        <span className="loading loading-bars"></span>
                    </div>
                </div>
            </dialog>
            <dialog  //showw confirm message
                id="my_modal_confirm" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm</h3>
                    <span className="text-warning text-xl min-h-4">{typeof(text)==="string" ? text : "Are you sure?"}</span>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={() => handleConfirm(true)}
                                className="btn">Yes</button>
                            <button onClick={() => handleConfirm(false)}
                                className="btn ms-2">No</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}
