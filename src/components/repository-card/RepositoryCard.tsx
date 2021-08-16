import React from "react";
import style from "./RepositoryCard.module.css";
import forkLogo from "../../common/images/git_fork_icon.svg";
import watchersLogo from "../../common/images/watchers.svg";
import starLogo from "../../common/images/star.svg";

export type RepositoryCardPropsType = {
    name: string
    description: string
    url: string
    forksCount: number
    watchers: number
    stargazersCount: number
}

export const RepositoryCard:React.FC<RepositoryCardPropsType> = ({
                                                                     name,
                                                                     description,
                                                                     url,
                                                                     forksCount,
                                                                     watchers,
                                                                     stargazersCount}) => {
    return (
        <div className={style.repoCard}>
            <a href={url}><h2>{name}</h2></a>
            <p>{description}</p>
            <p className={style.urlPoint}>
                <span>URL:</span> <a href={url}>{url}</a>
            </p>
            <div className={style.gitDataItems}>
                <div className={style.cardItem}>
                    <img className={style.gitLogos} src={forkLogo} alt=""/>
                    {forksCount} <span>forks</span>
                </div>
                <div className={style.cardItem}>
                    <img className={style.gitLogos} src={watchersLogo} alt=""/>
                    <div>
                        {watchers}<span>watchers</span>
                    </div>

                </div>
                <div className={style.cardItem}>
                    <img className={style.gitLogos} src={starLogo} alt=""/>
                    <div>{stargazersCount}<span>stargazers</span></div>
                </div>
            </div>
        </div>
    )
}