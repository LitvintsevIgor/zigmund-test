import React, {ChangeEvent} from "react";
import style from "./Header.module.scss";

export type HeaderPropsType = {
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    orgName: string
    getRepositoriesCallback: (orgName: string) => void
}

export const Header = React.memo( ({onChangeHandler, orgName, getRepositoriesCallback}: HeaderPropsType) => {
        return (
            <header className={style.header}>
                <h1>Please, enter a company name</h1>
                <div className={style.searchForm}>
                    <div className={style.inputBtnWrapper}>
                        <input type="text" onChange={onChangeHandler} value={orgName} onKeyPress={e => {
                            e.key === 'Enter' && getRepositoriesCallback(orgName)
                        }}/>
                    </div>

                    <div className={style.inputBtnWrapper}>
                        <button onClick={() => getRepositoriesCallback(orgName)}>GET GITHUB REPOSITORIES</button>
                    </div>
                </div>
            </header>
        )
    }
)