import axios, {AxiosResponse} from "axios";
import {CompanyInfoType, RepositoriesType} from "../redux/repositoriesReducer";

const settings = {
    headers: {
        'authorization': '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'
    }
}
const instance = axios.create({
    baseURL: 'https://api.github.com/',
    ...settings
})

export const API = {
    getRepositories(orgName: string, currentPage: number, repositoriesPerPage: number): Promise<AxiosResponse<RepositoriesType>> {
        return instance.get<RepositoriesType>(`orgs/${orgName}/repos?per_page=${repositoriesPerPage}&page=${currentPage}`)
    },
    getTotalRepositoriesCount(orgName: string): Promise<AxiosResponse<CompanyInfoType>> {
        return instance.get<CompanyInfoType>(`orgs/${orgName}`)
    }
}