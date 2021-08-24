import React, {ChangeEvent, useState} from 'react';
import './App.module.scss';
import {
    getRepositoriesActionCreator,
    setCurrentOrgNameAC,
    setCurrentPageAC, setErrorAC, setTotalRepositoriesCountActionCreator,
} from "../../redux/repositoriesReducer";
import {useDispatch, useSelector} from "react-redux";
import {AllAppStateType} from "../../redux/store";
import {Paginator} from "../paginator/Paginator";
import style from "./App.module.scss"
import {HelloMessage} from "../hello-message/HelloMessage";
import {Header} from "../header/Header";
import {ErrorAlert} from "../../common/error-alert/ErrorAlert";
import {Loading} from "../../common/loading/Loading";
import {RepositoriesList} from "../repositories-list/RepositoriesList";
import {NotFoundPage} from "../404-page/NotFoundPage";
import {Helmet} from "react-helmet";


export const App = React.memo( () => {

    // HOOKS
    const {
        repositories,
        repositoriesPerPage,
        currentOrgName,
        currentPage,
        showPaginatorFlag,
        helloMessageFlag,
        loading,
        pageIsNotFound,
        error
    } = useSelector((state: AllAppStateType) => state.data)
    const [orgName, setOrgName] = useState("")
    const [portionNumber, setPortionNumber] = useState(1)
    const [page, setPage] = useState(currentPage)
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
        <div className={style.appWrapper}>
            <Helmet>
                <title>Find a repository</title>
                <meta name='viewport' content='initial-scale=1, viewport-fit=cover'/>
            </Helmet>



            <div className={style.app}>
                {loading && <Loading/>}
                {error && <ErrorAlert error={error} closeErrorAlertHandler={closeErrorAlertHandler}/>}

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
        </div>

    )
})

export default App;


