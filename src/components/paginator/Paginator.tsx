import React, {useEffect, useState} from "react";
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
    const [portionSizeLocal, setPortionSizeLocal] = useState<number>(portionSize)

    // const dispatch = useDispatch()

    // const paginatorPagesCount = Math.ceil(totalRepositoriesCount / repositoriesPerPage)
    // const paginatorPages = getSequentialNumber(paginatorPagesCount)
    // const paginatorPortionCount = Math.ceil(paginatorPagesCount / portionSize)
    // const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    // const rightPortionPageNumber = portionNumber * portionSize

    const paginatorPagesCount = Math.ceil(totalRepositoriesCount / repositoriesPerPage)
    const paginatorPages = getSequentialNumber(paginatorPagesCount)
    const paginatorPortionCount = Math.ceil(paginatorPagesCount / portionSizeLocal)
    const leftPortionPageNumber = (portionNumber - 1) * portionSizeLocal + 1
    const rightPortionPageNumber = portionNumber * portionSizeLocal

    const selectedPageStyle = `${style.selectedPage} + ${style.page}`

    const breakpoint = 490;

    useEffect(() => {
        if (window.innerWidth < breakpoint) {
            window.addEventListener("resize", () => setPortionSizeLocal(5));
        }
    }, []);


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