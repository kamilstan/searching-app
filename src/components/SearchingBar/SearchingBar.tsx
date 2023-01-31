import React, {useContext} from "react";

import {SearchContext} from "../../contexts/search.context";
import {PageContext} from "../../contexts/page.context";

import SearchingBarCSS from "./SearchingBar.module.css";

export const SearchingBar = () => {

    const {search, setSearch} = useContext(SearchContext);
    const {setPage} = useContext(PageContext);

    const handleSearch = (e:any) => {
        setSearch(e.target.value);
        setPage(1);
    }

    return (
        <input className={SearchingBarCSS.input}
               type="search"
               placeholder="Start searching..."
               value={search}
               onChange={handleSearch}
        />
    )
}