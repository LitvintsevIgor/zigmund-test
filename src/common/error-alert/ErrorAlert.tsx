import style from "./ErrorAlert.module.scss";
import closeIcon from "../images/error.png";
import React from "react";

type ErrorAlertPropsType = {
    error: string
    closeErrorAlertHandler: () => void
}

export const ErrorAlert = React.memo(({error, closeErrorAlertHandler}: ErrorAlertPropsType) => {
        return (
            <div className={style.errorAlert}>
                <p>{error}</p>
                <img src={closeIcon} alt="" onClick={closeErrorAlertHandler}/>
            </div>
        )
    }
)
