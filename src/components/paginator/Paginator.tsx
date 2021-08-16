import React from "react";
import {useSelector} from "react-redux";
import {AllAppStateType} from "../../redux/store";
import style from "./Paginator.module.css";

type PaginatorPropsType = {
    getNewRepositoriesPage: (currentPage: number) => void;
    portionNumber: number;
    setPortionNumber: React.Dispatch<React.SetStateAction<number>>;
    repositoriesPerPage: number;
    currentPage: number;
}

export const Paginator: React.FC<PaginatorPropsType> = ({getNewRepositoriesPage,
                                                            currentPage,
                                                            setPortionNumber,
                                                            repositoriesPerPage,
                                                            portionNumber,
                                                        }) => {

    const totalRepositoriesCount = useSelector<AllAppStateType, number>(state => state.data.totalRepositoriesCount)
    const portionSize = useSelector<AllAppStateType, number>(state => state.data.portionSize)

    let paginatorPagesCount = Math.ceil(totalRepositoriesCount / repositoriesPerPage)
    let paginatorPages = [];
    for (let i = 1; i <= paginatorPagesCount; i++) {
        paginatorPages.push(i)
    }
    const paginatorPortionCount = Math.ceil(paginatorPagesCount / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const selectedPageStyle = `${style.selectedPage} + ${style.page}`

    return (
        <div className={style.paginator}>

            {portionNumber > 1 && <button style={{borderRadius: "6px 0 0 6px"}} onClick={() => setPortionNumber((prevState) => prevState - 1)}>PREV</button>}

            {paginatorPages
                .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => <span key={p} onClick={() => getNewRepositoriesPage(p)}
                                className={currentPage === p ? selectedPageStyle : style.page}>{p}</span>)}

            {portionNumber !== paginatorPortionCount && <button onClick={() => setPortionNumber((prevState) => prevState + 1)}>NEXT</button>}
        </div>
    )
}