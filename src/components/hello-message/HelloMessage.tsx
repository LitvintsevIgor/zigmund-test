import style from "./HelloMessage.module.scss";
import githubLogo from "../../common/images/github-logo.svg";
import React from "react";

export const HelloMessage = () => {
    return (
        <div className={style.helloMessage}>
            <img src={githubLogo} alt=""/>
            <p>Hi there, this is a super-puper service for searching GitHub repositories by company name!</p>
        </div>
    )
}