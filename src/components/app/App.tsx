import React, {ChangeEvent, useState} from 'react';
import './App.module.css';
import {
    getRepositoriesActionCreator, RepositoriesType,
    setCurrentOrgNameAC,
    setCurrentPageAC, setErrorAC, setTotalRepositoriesCountActionCreator,
} from "../../redux/repositoriesReducer";
import {useDispatch, useSelector} from "react-redux";
import {AllAppStateType} from "../../redux/store";
import {Paginator} from "../paginator/Paginator";
import style from "./App.module.css"
import {HelloMessage} from "../hello-message/HelloMessage";
import {Header} from "../header/Header";
import {ErrorAlert} from "../../common/error-alert/ErrorAlert";
import {Loading} from "../../common/loading/Loading";
import {RepositoriesList} from "../repositories-list/RepositoriesList";
import {NotFoundPage} from "../404-page/NotFoundPage";

export const App = React.memo(() => {

    // HOOKS
    const [orgName, setOrgName] = useState("")
    const [portionNumber, setPortionNumber] = useState(1)
    const repositories = useSelector<AllAppStateType, RepositoriesType>(state => state.data.repositories)
    const repositoriesPerPage = useSelector<AllAppStateType, number>(state => state.data.repositoriesPerPage)
    const currentOrgName = useSelector<AllAppStateType, string>(state => state.data.currentOrgName)
    const currentPage = useSelector<AllAppStateType, number>(state => state.data.currentPage)
    const [page, setPage] = useState(currentPage)
    const showPaginatorFlag = useSelector<AllAppStateType, boolean>(state => state.data.showPaginatorFlag)
    const helloMessageFlag = useSelector<AllAppStateType, boolean>(state => state.data.helloMessageFlag)
    const loadingFlag = useSelector<AllAppStateType, boolean>(state => state.data.loading)
    const pageIsNotFound = useSelector<AllAppStateType, boolean>(state => state.data.pageIsNotFound)
    const error = useSelector<AllAppStateType, string>(state => state.data.error)
    const dispatch = useDispatch();

    // HANDLERS AND CALLBACKS
    const getRepositories = (currentOrgName: string, currentPage: number, repositoriesPerPage: number) => {
        dispatch(getRepositoriesActionCreator(currentOrgName, currentPage, repositoriesPerPage))
        dispatch(setTotalRepositoriesCountActionCreator(orgName))
    }

    const getRepositoriesCallback = (orgName: string) => {
        if (!orgName) {
            dispatch(setErrorAC("Company name required"))
        } else {
            setPortionNumber(1)
            dispatch(setCurrentPageAC(1))
            dispatch(setCurrentOrgNameAC(orgName))
            setPage(1)
            getRepositories(orgName, page, repositoriesPerPage)
        }
    }

    const getNewRepositoriesPage = (currentPage: number) => {
        dispatch(setCurrentPageAC(currentPage))
        getRepositories(currentOrgName, currentPage, repositoriesPerPage)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setOrgName(e.target.value)
    }

    const closeErrorAlert = () => {
        setTimeout(() => {
            dispatch(setErrorAC(""))
        }, 4000)
    }

    const closeErrorAlertHandler = () => {
        dispatch(setErrorAC(""))
    }

    error && closeErrorAlert()

    return (
        <div className={style.app}>

            {error && <ErrorAlert error={error} closeErrorAlertHandler={closeErrorAlertHandler}/>}

            {loadingFlag && <Loading/>}
            {/*<Loading/>*/}
            <Header onChangeHandler={onChangeHandler}
                    getRepositoriesCallback={getRepositoriesCallback}
                    orgName={orgName}
            />

            {helloMessageFlag
                ? <HelloMessage/>
                : <>
                    {(pageIsNotFound || !repositories.length)
                        ? <NotFoundPage currentOrgName={currentOrgName}/>
                        : <>
                            <RepositoriesList repositories={repositories}/>

                            {showPaginatorFlag && <Paginator
                                portionNumber={portionNumber}
                                setPortionNumber={setPortionNumber}
                                getNewRepositoriesPage={getNewRepositoriesPage}
                                repositoriesPerPage={repositoriesPerPage}
                                currentPage={currentPage}
                            />}
                        </> }
                </>

            }
        </div>
    )
});

export default App;


