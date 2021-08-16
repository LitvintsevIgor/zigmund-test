import React from "react";
import style from "./RepositotyCardItem.module.css";

type RepositoryCardItemPropsType = {
    item: string
    count: number
    logo: string
}

export const RepositoryCardItem: React.FC<RepositoryCardItemPropsType> = ({count, item, logo}) => {
    return (
        <div className={style.cardItem}>
            <img className={style.gitLogos} src={logo} alt=""/>
            {count} <span>{item}</span>
        </div>
    )
}