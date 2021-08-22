import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {API} from "../api/api";
import {
    changeHelloMessageFlagAC,
    changePageIsNoneFoundFlagAC,
    changeShowPaginatorFlagAC, CompanyInfoType,
    getRepositoriesActionCreator,
    RepositoriesType,
    setCurrentOrgNameAC, setErrorAC,
    setLoadingAC, setRepositoriesAC, setTotalRepositoriesCountAC, setTotalRepositoriesCountActionCreator
} from "./repositoriesReducer";


// SAGAS
export function* getRepositoriesWorkerSaga (action: ReturnType<typeof getRepositoriesActionCreator>) {
    try {
        yield put(changePageIsNoneFoundFlagAC(false))
        yield put(setLoadingAC(true))
        const repositories: AxiosResponse<RepositoriesType> = yield call( API.getRepositories, action.orgName, action.currentPage, action.repositoriesPerPage)
        yield put(setLoadingAC(false))
        yield put(changeShowPaginatorFlagAC(true))
        yield put(setCurrentOrgNameAC(action.orgName))
        yield put(setRepositoriesAC(repositories.data, false))
        yield put(setErrorAC(""))
    }
    catch (e) {
        if (e.message === "Request failed with status code 404") {
            yield put(changeShowPaginatorFlagAC(false))
            yield put(changeHelloMessageFlagAC(false))
            yield put(changePageIsNoneFoundFlagAC(true))
            yield put(setLoadingAC(false))
        } else {
            yield put(setLoadingAC(false))
            yield put(setErrorAC(e.message))
        }
    }
}

export function* setTotalRepositoriesCountWorkerSaga (action: ReturnType<typeof setTotalRepositoriesCountActionCreator>) {
    try {
        const res: AxiosResponse<CompanyInfoType> = yield call(API.getTotalRepositoriesCount, action.orgName)
        yield put(setTotalRepositoriesCountAC(res.data.public_repos, 10))
    }
    catch (e) {
        if (e.message === "Request failed with status code 404") {
            yield put(changeShowPaginatorFlagAC(false))
            yield put(changeHelloMessageFlagAC(false))
            yield put(changePageIsNoneFoundFlagAC(true))
            yield put(setLoadingAC(false))
        }
    }

}

export function* rootWatcher () {
    yield takeEvery("REPO/GET-REPO", getRepositoriesWorkerSaga)
    yield takeEvery("REPO/SET-TOTAL-REPO-COUNT", setTotalRepositoriesCountWorkerSaga)
}
