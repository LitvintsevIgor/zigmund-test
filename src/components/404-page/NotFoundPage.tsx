import React from "react";
import style from "./NotFoundPage.module.scss";
import notFound from "../../common/images/404.png";

type NotFoundPagePropsType = {
    currentOrgName: string
}

export const NotFoundPage = React.memo( ({currentOrgName}: NotFoundPagePropsType) => {
        console.log("NotFoundPage rendered")
        return (
            <div className={style.notFound}>
                <p><span className={style.sorryWord}>Sorry,</span> <br/>I couldn't find <span
                    className={style.searchCompany}>{currentOrgName}</span> GitHub repositories. Please make sure the
                    company name is correct and try again.</p>
                <img src={notFound} alt=""/>
            </div>
        )
})