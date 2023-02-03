import React, {SyntheticEvent, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {PhotoRecord} from "../../types/photo/photo";

import {SearchContext} from "../../contexts/search.context";
import {PhotosContext} from "../../contexts/photos.context";
import {PageContext} from "../../contexts/page.context";
import {CachedHintsContext} from "../../contexts/cachedHints.context";

import {SingleHint} from "../SingleHint/SingleHint";

import HintListCSS from "./HintList.module.css"

interface Props {
    filteredPhotos: PhotoRecord[];
}

export const HintList = (props:Props) => {

    const {setSearch} = useContext(SearchContext);
    const {setPhotos} = useContext(PhotosContext);
    const {page, setPage} = useContext(PageContext);
    const {cachedData, setCachedData} = useContext(CachedHintsContext);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("searchResults", JSON.stringify(cachedData));
    }, [cachedData]);

    const handleSearchFromHint = ( e:SyntheticEvent, value:string) => {
        setPhotos([]);
        setSearch(value);
        setPage(1);
        navigate(`/${page}`);
        setCachedData((prev:string[])=> [...prev, value].filter((item, index, array) => array.indexOf(item) === index).sort() ) ;

    }

    return (
        <div className={HintListCSS.dropdown}>
            {
                props.filteredPhotos
                    .map(hint => (
                        <SingleHint
                            key={hint.id}
                            title={hint.title}
                            handleSearchFromHint={(e:SyntheticEvent) => handleSearchFromHint(e, hint.title)}
                        />
                    ))
            }
        </div>
    )
}