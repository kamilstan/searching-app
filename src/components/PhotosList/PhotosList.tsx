import React, {useContext, useEffect, useState} from "react";

import {SearchContext} from "../../contexts/search.context";
import {PageContext} from "../../contexts/page.context";

import {PhotoRecord} from "../../types/photo/photo";

import {SinglePhoto} from "../SinglePhoto/SinglePhoto";
import {LoadingMoreBtn} from "../LoadingMoreBtn/LoadingMoreBtn";

import PhotosListCSS from "./PhotosList.module.css";

export const PhotosList = () => {

    const {search} = useContext(SearchContext);
    const {page, setPage} = useContext(PageContext);
    const [photos, setPhotos] = useState<PhotoRecord[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            const res = await fetch(`https://api.unsplash.com/search/photos?query=${search}&page=${page}`, {
                headers: {
                    'Authorization': 'Client-ID B-VvcxUrdR5YXVs7STCk9gKxTidm5qHJbX_CxHnyaZU',
                },
            })
            const data = await res.json();
            setPhotos(data.results);
            console.log(data.results)
        })();
        setLoading(false);

    }, [search, page]);

    const loadMorePhotos = () => {
        setPage(page + 1);
    }

    if (loading) return <h1>Loading...</h1>

    return (
        <>
            <div className={PhotosListCSS.list}>
                {photos.map((photo:PhotoRecord) => (
                    <SinglePhoto key={photo.id} src={photo.urls.small} description={photo.description}/>
                ))}
            </div>
            {photos.length >= 10
                ? <LoadingMoreBtn loadMorePhotos={loadMorePhotos}/>
                : null
            }
        </>
    )
}