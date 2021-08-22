import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AllAppStateType} from "../../redux/store";
import style from "./Paginator.module.css";
import {getSequentialNumber} from "../../common/helpers/helpers";
import {setTotalRepositoriesCountAC} from "../../redux/repositoriesReducer";

type PaginatorPropsType = {
    getNewRepositoriesPage: (currentPage: number) => void;
    portionNumber: number;
    setPortionNumber: React.Dispatch<React.SetStateAction<number>>;
    repositoriesPerPage: number;
    currentPage: number;
}

export const Paginator = React.memo( function ({getNewRepositoriesPage,
                                                  currentPage,
                                                  setPortionNumber,
                                                  repositoriesPerPage,
                                                  portionNumber}: PaginatorPropsType) {
    const totalRepositoriesCount = useSelector<AllAppStateType, number>(state => state.data.totalRepositoriesCount)
    const portionSize = useSelector<AllAppStateType, number>(state => state.data.portionSize)
    const dispatch = useDispatch()

    const paginatorPagesCount = Math.ceil(totalRepositoriesCount / repositoriesPerPage)
    const paginatorPages = getSequentialNumber(paginatorPagesCount)
    const paginatorPortionCount = Math.ceil(paginatorPagesCount / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const selectedPageStyle = `${style.selectedPage} + ${style.page}`

    useEffect( () => {
        debugger
        if (window.innerWidth < 490) {
            dispatch(setTotalRepositoriesCountAC(totalRepositoriesCount, 5))
        }
    })

    return (
        <div className={style.paginator}>

            {portionNumber > 1 && <button className={style.prevButton} onClick={() => setPortionNumber((prevState) => prevState - 1)}>PREV</button>}

            {paginatorPages
                .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => <span key={p} onClick={() => getNewRepositoriesPage(p)}
                                className={currentPage === p ? selectedPageStyle : style.page}>{p}</span>)}

            {portionNumber !== paginatorPortionCount && <button onClick={() => setPortionNumber((prevState) => prevState + 1)}>NEXT</button>}
        </div>
    )
})