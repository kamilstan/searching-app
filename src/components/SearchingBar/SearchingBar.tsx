import React, {ChangeEvent, SyntheticEvent, useContext} from "react";

import {SearchContext} from "../../contexts/search.context";
import {PageContext} from "../../contexts/page.context";
import {PhotosContext} from "../../contexts/photos.context";

import {SingleHint} from "../SingleHint/SingleHint";

import SearchingBarCSS from "./SearchingBar.module.css";

export const SearchingBar = () => {

    const {search, setSearch} = useContext(SearchContext);
    const {photos, setPhotos} = useContext(PhotosContext);
    const {setPage} = useContext(PageContext);

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setPhotos([]);
        setSearch(e.target.value);
        setPage(1);
    }

    const handleSearchFromHint = ( e:SyntheticEvent,value:string) => {
        setPhotos([]);
        setSearch(value);
        setPage(1);
    }

    const filteredPhotos = photos.filter(hint => (
        (hint.title.toLowerCase().startsWith(search.toLowerCase())) &&
        (hint.title.toLowerCase() !== search.toLowerCase())
    ));

    return (
        <div className={SearchingBarCSS.search}>
            <input className={SearchingBarCSS.input}
                   type="search"
                   placeholder="Start searching..."
                   value={search}
                   onChange={handleSearch}
            />
            {
                search && filteredPhotos.length > 0 &&
                <div className={SearchingBarCSS.dropdown}>
                    {
                        filteredPhotos
                            .map(hint => (
                                <SingleHint
                                    key={hint.id}
                                    title={hint.title}
                                    handleSearchFromHint={(e:SyntheticEvent) => handleSearchFromHint(e, hint.title)}
                                />
                            ))
                            .slice(8,13)
                    }
                </div>}
        </div>

    )
}