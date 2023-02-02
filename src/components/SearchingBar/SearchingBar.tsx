import React, {ChangeEvent, SyntheticEvent, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {SearchContext} from "../../contexts/search.context";
import {PageContext} from "../../contexts/page.context";
import {PhotosContext} from "../../contexts/photos.context";

import {SingleHint} from "../SingleHint/SingleHint";

import SearchingBarCSS from "./SearchingBar.module.css";
import SingleHintCSS from "../SingleHint/SingleHint.module.css"

export const SearchingBar = () => {

    const {search, setSearch} = useContext(SearchContext);
    const {photos, setPhotos} = useContext(PhotosContext);
    const {page, setPage} = useContext(PageContext);

    const [cachedData, setCachedData] = useState<string[]>(() => {
        try {
            const value = localStorage.getItem("searchResults");
            return value ? JSON.parse(value) : [];
        } catch {
            return []
        }
    });
    const [isFocused, setIsFocused] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("searchResults", JSON.stringify(cachedData));
    }, [cachedData]);


    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setPhotos([]);
        setSearch(e.target.value);
        setPage(1);
        navigate(`/${page}`);
    }

    const handleSearchFromHint = ( e:SyntheticEvent, value:string) => {
        setPhotos([]);
        setSearch(value);
        setPage(1);
        navigate(`/${page}`);
        setCachedData((prev) => [...prev, value].filter((item, index, array) => array.indexOf(item) === index));

    }

    const handleSearchFromCachedData = ( e:SyntheticEvent, value:string) => {
        setPhotos([]);
        setSearch(value);
        setPage(1);
        navigate(`/${page}`);

    }

    const handleClick = (e:SyntheticEvent) => {
        setPage(1);
        setSearch("");
        navigate(`/`);
    }

    const handleFocus = (e: SyntheticEvent) => {
        setIsFocused(true);
    }

    const handleBlur = (e: SyntheticEvent) => {
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
                <input className={SearchingBarCSS.input}
                       type="text"
                       placeholder="Start searching..."
                       value={search}
                       onChange={handleSearch}
                       onFocus={handleFocus}
                       onBlur={handleBlur}

                />
                {
                    search ?
                    <button onClick={handleClick} className={SearchingBarCSS["btn-exit"]}>
                        <img src="close.svg" alt="close" className={SearchingBarCSS.icon} />
                    </button>
                    :
                    <button className={SearchingBarCSS["btn-search"]}>
                        <img src="search.svg" alt="search" className={SearchingBarCSS.icon} />
                    </button>
                }
            </label>
            {
                search ?
                    filteredPhotos.length > 0 &&
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
                    :
                    <div className={SearchingBarCSS.dropdown}>
                        {isFocused &&
                        cachedData
                            .map((item:string, index) =>
                                <p key={index}
                                   className={SingleHintCSS.hint}
                                   onClick={e => handleSearchFromCachedData(e, item)}
                                >
                                    {item}
                                </p>
                            )
                        }
                    </div>
            }
        </div>
    )
}