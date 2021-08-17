import React, {ChangeEvent} from "react";
import style from "./Header.module.css";

export type HeaderPropsType = {
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    orgName: string
    getRepositoriesCallback: (orgName: string) => void
}

export const Header = React.memo(function ({onChangeHandler, orgName, getRepositoriesCallback}: HeaderPropsType) {
        return (
            <header>
                <h1>Please, enter a company name</h1>
                <div className={style.searchForm}>
                    <input type="text" onChange={onChangeHandler} value={orgName} onKeyPress={e => {
                        e.key === 'Enter' && getRepositoriesCallback(orgName)
                    }}/>
                    <div>
                        <button onClick={() => getRepositoriesCallback(orgName)}>GET GITHUB REPOSITORIES</button>
                    </div>
                </div>
            </header>
        )
    }
)