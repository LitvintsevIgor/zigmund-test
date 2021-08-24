import React from "react";
import style from "./RepositotyCardItem.module.scss";

type RepositoryCardItemPropsType = {
    item: string
    count: number
    logo: string
}

export const RepositoryCardItem = React.memo(({count, item, logo}: RepositoryCardItemPropsType) => {
        return (
            <div className={style.cardItem}>
                <img className={style.gitLogos} src={logo} alt=""/>
                {count} <span>{item}</span>
            </div>
        )
    }
)