import React from "react";

import {SearchingBar} from "../../components/SearchingBar/SearchingBar";
import {PhotosList} from "../../components/PhotosList/PhotosList";

import AppCSS from "./AppView.module.css";

export const AppView = () => {
    return (
        <div className={AppCSS.wrapper}>
            <SearchingBar/>
            <PhotosList/>
        </div>
    )
}