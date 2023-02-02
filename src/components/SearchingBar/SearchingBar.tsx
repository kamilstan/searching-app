import React, {ChangeEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import {SearchContext} from "../../contexts/search.context";
import {PageContext} from "../../contexts/page.context";
import {PhotosContext} from "../../contexts/photos.context";

import {SearchBtn} from "../../common/SearchBtn/SearchBtn";
import {SearchInput} from "../../common/SearchInput/SearchInput";
import {HintList} from "../HintList/HintList";
import {CachedHintList} from "../CachedHintList/CachedHintList";

import SearchingBarCSS from "./SearchingBar.module.css";

export const SearchingBar = () => {

    const {search, setSearch} = useContext(SearchContext);
    const {photos, setPhotos} = useContext(PhotosContext);
    const {page, setPage} = useContext(PageContext);

    const [isFocused, setIsFocused] = useState(false);

    const navigate = useNavigate();

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setPhotos([]);
        setSearch(e.target.value);
        setPage(1);
        navigate(`/${page}`);
    }

    const handleClick = () => {
        setPage(1);
        setSearch("");
        navigate(`/`);
    }

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        },100)
    }

    const filteredPhotos = photos.filter(hint => (
        (hint.title.toLowerCase().includes(search.toLowerCase())) &&
        (hint.title.toLowerCase() !== search.toLowerCase())
    ));

    return (
        <div className={SearchingBarCSS.search}>
            <label className={SearchingBarCSS.label}>
                <SearchInput
                       type="text"
                       placeholder="Start searching..."
                       value={search}
                       onChange={(e:ChangeEvent<HTMLInputElement>) => handleSearch(e)}
                       onFocus={handleFocus}
                       onBlur={handleBlur}
                />
                {
                    search ?
                            <SearchBtn src="close.svg" alt="close" handleClick={handleClick}/>
                            :
                            <SearchBtn src="search.svg" alt="search"/>
                }
            </label>
            {
                search ?
                        filteredPhotos.length > 0 && <HintList filteredPhotos={filteredPhotos}/>
                       :
                        <CachedHintList isFocused={isFocused}/>
            }
        </div>
    )
}