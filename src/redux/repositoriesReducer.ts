const initialState: InitialStateType = {
    repositories: [] ,
    totalRepositoriesCount: 0,
    repositoriesPerPage: 10,
    portionSize: 10,
    currentPage: 1,
    currentOrgName: "",
    showPaginatorFlag: false,
    loading: false,
    helloMessageFlag: true,
    pageIsNotFound: false,
    error: ''
}

export const repositoriesReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "GET-REPOSITORIES":
            return {
                ...state,
                repositories: action.repositories,
                helloMessageFlag: action.helloMessageFlag
            }
        case "SET-TOTAL-REPOSITORIES-COUNT":
            return {
                ...state,
                totalRepositoriesCount: action.totalRepositoriesCount
            }
        case "SET-CURRENT-ORG-NAME":
            return {
                ...state,
                currentOrgName: action.orgName
            }
        case "SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "CHANGE-SHOW-PAGINATOR-FLAG":
            return {
                ...state,
                showPaginatorFlag: action.showPaginatorFlag
            }
        case "SET-LOADING":
            return {
                ...state,
                loading: action.loadingFlag
            }
        case "CHANGE-PAGE-IS-NOT-FOUND-FLAG":
            return {
                ...state,
                pageIsNotFound: action.pageIsNotFound
            }
        case "CHANGE-HELLO_MESSAGE-FLAG":
            return {
                ...state,
                helloMessageFlag: action.helloMessageFlag
            }
        case "SET-ERROR":
            return {
                ...state,
                error: action.error
            }
    }
    return state
}


// ACTION CREATORS
export const setRepositoriesAC = (repositories: RepositoriesType, helloMessageFlag: boolean) => ({type: 'GET-REPOSITORIES', repositories, helloMessageFlag} as const)
export const setTotalRepositoriesCountAC = (totalRepositoriesCount: number) => ({type: 'SET-TOTAL-REPOSITORIES-COUNT', totalRepositoriesCount} as const)
export const setCurrentOrgNameAC = (orgName: string) => ({type: 'SET-CURRENT-ORG-NAME', orgName} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage} as const)
export const changeShowPaginatorFlagAC = (showPaginatorFlag: boolean) => ({type: 'CHANGE-SHOW-PAGINATOR-FLAG', showPaginatorFlag} as const)
export const setLoadingAC = (loadingFlag: boolean) => ({type: 'SET-LOADING', loadingFlag} as const)
export const changeHelloMessageFlagAC = (helloMessageFlag: boolean) => ({type: 'CHANGE-HELLO_MESSAGE-FLAG', helloMessageFlag} as const)
export const changePageIsNoneFoundFlagAC = (pageIsNotFound: boolean) => ({type: 'CHANGE-PAGE-IS-NOT-FOUND-FLAG', pageIsNotFound} as const)
export const setErrorAC = (error: string) => ({type: 'SET-ERROR', error} as const)

export const getRepositoriesActionCreator = (orgName: string, currentPage: number, repositoriesPerPage: number) => ({type: "REPO/GET-REPO", orgName, currentPage, repositoriesPerPage})
export const setTotalRepositoriesCountActionCreator = (orgName: string) => ({type: "REPO/SET-TOTAL-REPO-COUNT", orgName})


// TYPES
export type InitialStateType = {
    repositories: RepositoryType[] ,
    totalRepositoriesCount: number,
    repositoriesPerPage: number,
    portionSize: number,
    currentPage: number,
    currentOrgName: string,
    showPaginatorFlag: boolean,
    loading: boolean,
    helloMessageFlag:boolean,
    pageIsNotFound: boolean,
    error: string
}

// RESPONSE TYPES
export type OwnerRepositoryType = {
    "login": string,
    "id": number,
    "node_id": string,
    "avatar_url": string,
    "gravatar_id": string,
    "url": string,
    "html_url": string,
    "followers_url": string,
    "following_url": string,
    "gists_url": string,
    "starred_url": string,
    "subscriptions_url": string,
    "organizations_url": string,
    "repos_url": string,
    "events_url": string,
    "received_events_url": string,
    "type": string,
    "site_admin": boolean
}
export type LicenseRepositoryType = {
    "key": string,
    "name": string,
    "spdx_id": string,
    "url": string,
    "node_id": string
}
export type PermissionsRepositoryType = {
    "admin": boolean,
    "maintain": boolean,
    "push": boolean,
    "triage": boolean,
    "pull": boolean
}
export type RepositoryType = {
    "id": number,
    "node_id": string,
    "name": string,
    "full_name": string,
    "private": boolean,
    "owner": OwnerRepositoryType,
    "html_url": string,
    "description": string,
    "fork": boolean,
    "url": string,
    "forks_url": string,
    "keys_url": string,
    "collaborators_url": string,
    "teams_url": string,
    "hooks_url": string,
    "issue_events_url": string,
    "events_url": string,
    "assignees_url": string,
    "branches_url": string,
    "tags_url": string,
    "blobs_url": string,
    "git_tags_url": string,
    "git_refs_url": string,
    "trees_url": string,
    "statuses_url": string,
    "languages_url": string,
    "stargazers_url": string,
    "contributors_url": string,
    "subscribers_url": string,
    "subscription_url": string,
    "commits_url": string,
    "git_commits_url": string,
    "comments_url": string,
    "issue_comment_url": string,
    "contents_url": string,
    "compare_url": string,
    "merges_url": string,
    "archive_url": string,
    "downloads_url": string,
    "issues_url": string,
    "pulls_url": string,
    "milestones_url": string,
    "notifications_url": string,
    "labels_url": string,
    "releases_url": string,
    "deployments_url": string,
    "created_at": string,
    "updated_at": string,
    "pushed_at": string,
    "git_url": string,
    "ssh_url": string,
    "clone_url": string,
    "svn_url": string,
    "homepage": string,
    "size": number,
    "stargazers_count": number,
    "watchers_count": number,
    "language": string,
    "has_issues": boolean,
    "has_projects": boolean,
    "has_downloads": boolean,
    "has_wiki": boolean,
    "has_pages": boolean,
    "forks_count": number,
    "mirror_url": null,
    "archived": boolean,
    "disabled": boolean,
    "open_issues_count": number,
    "license": LicenseRepositoryType,
    "forks": number,
    "open_issues": number,
    "watchers": number,
    "default_branch": string,
    "permissions": PermissionsRepositoryType
}
export type RepositoriesType = Array<RepositoryType>
export type CompanyInfoType = {
    "login": string,
    "id": 10639145,
    "node_id": string,
    "url": string,
    "repos_url": string,
    "events_url": string,
    "hooks_url": string,
    "issues_url": string,
    "members_url": string,
    "public_members_url": string,
    "avatar_url": string,
    "description": string,
    "name": string,
    "company": null,
    "blog": string,
    "location": string,
    "email": null,
    "twitter_username": null,
    "is_verified": true,
    "has_organization_projects": true,
    "has_repository_projects": true,
    "public_repos": 133,
    "public_gists": 0,
    "followers": 0,
    "following": 0,
    "html_url": string,
    "created_at": string,
    "updated_at": string,
    "type": string
}
type ActionsType = ReturnType<typeof setRepositoriesAC>
    | ReturnType<typeof setTotalRepositoriesCountAC>
    | ReturnType<typeof setCurrentOrgNameAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof changeShowPaginatorFlagAC>
    | ReturnType<typeof setLoadingAC>
    | ReturnType<typeof changePageIsNoneFoundFlagAC>
    | ReturnType<typeof changeHelloMessageFlagAC>
    | ReturnType<typeof setErrorAC>
