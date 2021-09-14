import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {API} from "../api/api";
import {
    changePageIsNoneFoundFlagAC,
    CompanyInfoType,
    getRepositoriesActionCreator,
    RepositoriesType, setErrorAC,
    setRepositoriesAC, setTotalRepositoriesCountAC, setTotalRepositoriesCountActionCreator
} from "./repositoriesReducer";


// SAGAS
export function* getRepositoriesWorkerSaga (action: ReturnType<typeof getRepositoriesActionCreator>) {
    try {
        yield put(changePageIsNoneFoundFlagAC(false, true, null, null))
        const repositories: AxiosResponse<RepositoriesType> = yield call( API.getRepositories, action.orgName, action.currentPage, action.repositoriesPerPage)
        yield put(setRepositoriesAC(repositories.data, false, false, true, action.orgName, ""))
    }
    catch (e) {
        if (e.message === "Request failed with status code 404") {
            yield put(changePageIsNoneFoundFlagAC(true, false, false, false))
        } else {
            yield put(setErrorAC(e.message, false))
        }
    }
}

export function* setTotalRepositoriesCountWorkerSaga (action: ReturnType<typeof setTotalRepositoriesCountActionCreator>) {
    try {
        const res: AxiosResponse<CompanyInfoType> = yield call(API.getTotalRepositoriesCount, action.orgName)
        yield put(setTotalRepositoriesCountAC(res.data.public_repos))
    }
    catch (e) {
        if (e.message === "Request failed with status code 404") {
            yield put(changePageIsNoneFoundFlagAC(true, false, false, false))
        }
    }

}

export function* rootWatcher () {
    yield takeEvery("REPO/GET-REPO", getRepositoriesWorkerSaga)
    yield takeEvery("REPO/SET-TOTAL-REPO-COUNT", setTotalRepositoriesCountWorkerSaga)
}
