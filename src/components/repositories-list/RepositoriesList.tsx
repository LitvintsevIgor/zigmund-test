import style from "./RepositoriesList.module.css";
import React from "react";
import {RepositoryCard} from "../repository-card/RepositoryCard";
import {RepositoriesType} from "../../redux/repositoriesReducer";

type RepositoriesListPropsType = {
    repositories: RepositoriesType
}

export const RepositoriesList: React.FC<RepositoriesListPropsType> = ({repositories}) => {
    return (
        <div className={style.repositoriesListWrapper}>
            {
                repositories.map((repository) => {
                    return (
                        <RepositoryCard key={repository.id}
                                        name={repository.name}
                                        description={repository.description}
                                        url={repository.html_url}
                                        forksCount={repository.forks_count}
                                        watchers={repository.watchers}
                                        stargazersCount={repository.stargazers_count}
                        />
                    )
                })
            }
        </div>
    )
}
