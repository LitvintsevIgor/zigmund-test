import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AllAppStateType} from "../../redux/store";
import style from "./Paginator.module.scss";
import {getSequentialNumber} from "../../common/helpers/helpers";


type PaginatorPropsType = {
    getNewRepositoriesPage: (currentPage: number) => void;
    portionNumber: number;
    setPortionNumber: React.Dispatch<React.SetStateAction<number>>;
    repositoriesPerPage: number;
    currentPage: number;
}

export const Paginator = React.memo(({getNewRepositoriesPage,
                                                  currentPage,
                                                  setPortionNumber,
                                                  repositoriesPerPage,
                                                  portionNumber}: PaginatorPropsType) => {

    const {totalRepositoriesCount, portionSize} = useSelector ((state: AllAppStateType) => state.data)
    const [portionSizeLocal, setPortionSizeLocal] = useState<number>(portionSize)

    const paginatorPagesCount = Math.ceil(totalRepositoriesCount / repositoriesPerPage)
    const paginatorPages = getSequentialNumber(paginatorPagesCount)
    const paginatorPortionCount = Math.ceil(paginatorPagesCount / portionSizeLocal)
    const leftPortionPageNumber = (portionNumber - 1) * portionSizeLocal + 1
    const rightPortionPageNumber = portionNumber * portionSizeLocal

    const selectedPageStyle = `${style.selectedPage} + ${style.page}`

    const breakpoint = 490;

    const changePortionSize = () => {
        if (window.innerWidth < breakpoint) {
            setPortionSizeLocal(5)
        } else {
            setPortionSizeLocal(10)
        }
    }

    useEffect(() => {
            window.addEventListener("resize", () => changePortionSize());
            return () => window.addEventListener("resize", () => changePortionSize());
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