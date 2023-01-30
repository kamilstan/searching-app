import React, {SyntheticEvent, useContext, useState} from "react";

import {SearchContext} from "../../contexts/search.context";

import SearchingBarCSS from "./SearchingBar.module.css";

export const SearchingBar = () => {

    const {search, setSearch} = useContext(SearchContext);

    return (
        <input className={SearchingBarCSS.input}
               type="search"
               placeholder="Start searching..."
               value={search}
               onChange={e => setSearch(e.target.value)}
        />
    )
}