import React, {ChangeEvent, useState} from 'react';
import './App.module.css';
import {
    getRepositoriesActionSaga, RepositoriesType,
    setCurrentOrgNameAC,
    setCurrentPageAC, setErrorAC, setTotalRepositoriesCountActionSaga,
} from "./redux/repositoriesReducer";
import {useDispatch, useSelector} from "react-redux";
import {AllAppStateType} from "./redux/store";
import {Paginator} from "./components/paginator/Paginator";
import style from "./App.module.css"
import loading from "./common/images/loading.svg"
import {RepositoryCard} from "./components/repository-card/RepositoryCard";
import closeIcon from "./common/images/error.png";
import notFound from "./common/images/404.png";
import notFoundText from "./common/images/404text.png";
import {HelloMessage} from "./components/hello-message/HelloMessage";
import {Header} from "./components/header/Header";

export const App = React.memo(() => {

    const [orgName, setOrgName] = useState("")
    const [portionNumber, setPortionNumber] = useState(1)
    const repositories = useSelector<AllAppStateType, RepositoriesType>(state => state.data.repositories)
    const repositoriesPerPage = useSelector<AllAppStateType, number>(state => state.data.repositoriesPerPage)
    const currentOrgName = useSelector<AllAppStateType, string>(state => state.data.currentOrgName)
    const currentPage = useSelector<AllAppStateType, number>(state => state.data.currentPage)
    const showPaginatorFlag = useSelector<AllAppStateType, boolean>(state => state.data.showPaginatorFlag)
    const helloMessageFlag = useSelector<AllAppStateType, boolean>(state => state.data.helloMessageFlag)
    const loadingFlag = useSelector<AllAppStateType, boolean>(state => state.data.loading)
    const pageIsNotFound = useSelector<AllAppStateType, boolean>(state => state.data.pageIsNotFound)
    const error = useSelector<AllAppStateType, string>(state => state.data.error)
    const dispatch = useDispatch();

    const getRepositories = (currentOrgName: string, currentPage: number, repositoriesPerPage: number) => {
        dispatch(getRepositoriesActionSaga(currentOrgName, currentPage, repositoriesPerPage))
        dispatch(setTotalRepositoriesCountActionSaga(orgName))
    }

    const getRepositoriesCallback = (orgName: string) => {
        setPortionNumber(1)
        dispatch(setCurrentPageAC(1))
        dispatch(setCurrentOrgNameAC(orgName))
        getRepositories(orgName, currentPage, repositoriesPerPage)
    }

    const getNewRepositoriesPage = (currentPage: number) => {
        dispatch(setCurrentPageAC(currentPage))
        getRepositories(currentOrgName, currentPage, repositoriesPerPage)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setOrgName(e.currentTarget.value)
    }

    const closeErrorAlert = () => {
        setTimeout(() => {
            dispatch(setErrorAC(""))
        }, 10000)
    }

    const closeErrorAlertHandler = () => {
        dispatch(setErrorAC(""))
    }

    error && closeErrorAlert()

    return (
        <div className={style.app}>

            {error &&
            <div className={style.errorAlert}>
                <p>{error}</p>
                <img src={closeIcon} alt="" onClick={closeErrorAlertHandler}/>
            </div>}

            {loadingFlag &&
            <div className={style.loadingWrapper}><img className={style.loading} src={loading} alt=""/></div>}

            <Header onChangeHandler={onChangeHandler}
                    getRepositoriesCallback={getRepositoriesCallback}
                    orgName={orgName}/>

            {helloMessageFlag
                ? <HelloMessage/>
                :
                <div className={style.repoCardsWrapper}>
                    {
                        pageIsNotFound
                            ? <div className={style.notFound}>
                                <img src={notFoundText} className={style.notFoundText} alt=""/>
                                <img src={notFound} alt=""/>
                            </div>
                            : <div className={style.repoCardsWrapper}>
                                {
                                    repositories.map((rep) => {
                                        return (
                                            <RepositoryCard key={rep.id}
                                                            name={rep.name}
                                                            description={rep.description}
                                                            url={rep.html_url}
                                                            forksCount={rep.forks_count}
                                                            watchers={rep.watchers}
                                                            stargazersCount={rep.stargazers_count}
                                            />
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            }

            {showPaginatorFlag && <Paginator
                portionNumber={portionNumber}
                                             setPortionNumber={setPortionNumber}
                                             getNewRepositoriesPage={getNewRepositoriesPage}
                                             // orgName={currentOrgName}
                                             repositoriesPerPage={repositoriesPerPage}
                                             currentPage={currentPage}
            />}
        </div>
    );
})

export default App;


