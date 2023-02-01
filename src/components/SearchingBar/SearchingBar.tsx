import React, {ChangeEvent, SyntheticEvent, useContext} from "react";
import {useNavigate} from "react-router-dom";

import {SearchContext} from "../../contexts/search.context";
import {PageContext} from "../../contexts/page.context";
import {PhotosContext} from "../../contexts/photos.context";

import {SingleHint} from "../SingleHint/SingleHint";

import SearchingBarCSS from "./SearchingBar.module.css";

export const SearchingBar = () => {

    const {search, setSearch} = useContext(SearchContext);
    const {photos, setPhotos} = useContext(PhotosContext);
    const {page, setPage} = useContext(PageContext);
    const navigate = useNavigate();

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setPhotos([]);
        setSearch(e.target.value);
        setPage(1);
        navigate(`/${page}`);

    }

    const handleSearchFromHint = ( e:SyntheticEvent,value:string) => {
        setPhotos([]);
        setSearch(value);
        setPage(1);
        navigate(`/${page}`);
    }

    const filteredPhotos = photos.filter(hint => (
        (hint.title.toLowerCase().includes(search.toLowerCase())) &&
        (hint.title.toLowerCase() !== search.toLowerCase())
    ));

    const handleClick = (e:SyntheticEvent) => {
        e.preventDefault();
        setPage(1);
        setSearch("");
        navigate(`/`);

    }

    return (
        <div className={SearchingBarCSS.search}>

            <label className={SearchingBarCSS.label}>
                <input className={SearchingBarCSS.input}
                       type="text"
                       placeholder="Start searching..."
                       value={search}
                       onChange={handleSearch}
                />
                {search ? <button onClick={handleClick} className={SearchingBarCSS["btn-exit"]}>
                    <img src="close.svg" alt="close" className={SearchingBarCSS.icon} />
                </button> :
                <button className={SearchingBarCSS["btn-search"]}>
                    <img src="search.svg" alt="search" className={SearchingBarCSS.icon} />
                </button>}
            </label>
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
                    }
                </div>
            }
        </div>

    )
}