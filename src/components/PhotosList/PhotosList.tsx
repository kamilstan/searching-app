import React, {useContext, useEffect, useState} from "react";

import {SearchContext} from "../../contexts/search.context";
import {PageContext} from "../../contexts/page.context";
import {PhotosContext} from "../../contexts/photos.context";

import {PhotoRecord} from "../../types/photo/photo";

import {SinglePhoto} from "../SinglePhoto/SinglePhoto";
import {LoadingMoreBtn} from "../LoadingMoreBtn/LoadingMoreBtn";

import PhotosListCSS from "./PhotosList.module.css";
import {useDebounce} from "../../hooks/useDebounce";

export const PhotosList = () => {

    const {search} = useContext(SearchContext);
    const {page, setPage} = useContext(PageContext);
    const {photos, setPhotos} = useContext(PhotosContext);

    const [loading, setLoading] = useState(false);

    const debouncedSearch = useDebounce(search, 500);


    useEffect(() => {
        setLoading(true);
        (async () => {
            const res = await fetch(`https://api.unsplash.com/search/collections?query=${debouncedSearch}&page=${page}&per_page=20`, {
                headers: {
                    'Authorization': 'Client-ID B-VvcxUrdR5YXVs7STCk9gKxTidm5qHJbX_CxHnyaZU',
                },
            })
            const data = await res.json();
            setPhotos(data.results);

        })();
        setLoading(false);

    }, [debouncedSearch, page]);

    console.log(photos);

    const loadMorePhotos = () => {
        setPage(page + 1);
    }

    if (loading) return <h1>Loading...</h1>

    return (
        <>
            <div className={PhotosListCSS.list}>
                {photos.map((photo:PhotoRecord) => (
                    <SinglePhoto key={photo.id} src={photo.cover_photo.urls.small} description={photo.description}/>
                ))}
            </div>
            {photos.length >= 10
                ? <LoadingMoreBtn loadMorePhotos={loadMorePhotos}/>
                : null
            }
        </>
    )
}