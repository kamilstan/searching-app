import React, {SyntheticEvent, useContext} from "react";

import {useNavigate} from "react-router-dom";

import {SearchContext} from "../../contexts/search.context";
import {PhotosContext} from "../../contexts/photos.context";
import {PageContext} from "../../contexts/page.context";
import {CachedHintsContext} from "../../contexts/cachedHints.context";

import {SingleCachedHint} from "../SingleCachedHint/SingleCachedHint";

import CachedHintListCSS from "./CachedHintList.module.css";

interface Props {
    isFocused: boolean;
}

export const CachedHintList = (props:Props) => {

    const {setSearch} = useContext(SearchContext);
    const {setPhotos} = useContext(PhotosContext);
    const {page, setPage} = useContext(PageContext);
    const {cachedData} = useContext(CachedHintsContext);

    const navigate = useNavigate();

    const handleSearchFromCachedData = (e:SyntheticEvent,value:string) => {
        setPhotos([]);
        setSearch(value);
        setPage(1);
        navigate(`/${page}`);
    }

    return (
        <div className={CachedHintListCSS.dropdown}>
            {
                props.isFocused &&
                cachedData
                    .map((item:string, index:number) =>
                        <SingleCachedHint key={index} handleSearchFromCachedData={(e:SyntheticEvent) => handleSearchFromCachedData(e, item)} item={item}/>
                    )
            }
        </div>
    )
}