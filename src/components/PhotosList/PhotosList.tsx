import React, {useContext, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

import {SearchContext} from "../../contexts/search.context";
import {PageContext} from "../../contexts/page.context";
import {PhotosContext} from "../../contexts/photos.context";

import {PhotoRecord} from "../../types/photo/photo";

import {useDebounce} from "../../hooks/useDebounce";

import {SinglePhoto} from "../SinglePhoto/SinglePhoto";
import {LoadingMoreBtn} from "../LoadingMoreBtn/LoadingMoreBtn";

import PhotosListCSS from "./PhotosList.module.css";

export const PhotosList = () => {

    const {search} = useContext(SearchContext);
    const {page, setPage} = useContext(PageContext);
    const {photos, setPhotos} = useContext(PhotosContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const debouncedSearch = useDebounce(search, 500);

    const {pageNumber} = useParams();

    useEffect(() => {
        setLoading(true);
        (async () => {
            const res = await fetch(`https://api.unsplash.com/search/collections?query=${debouncedSearch}&page=${pageNumber}&per_page=20`, {
                headers: {
                    'Authorization': process.env.REACT_APP_CLIENT_ID as string,
                },
            })
            const data = await res.json();
            setPhotos(data.results);
        })();
        setLoading(false);

    }, [debouncedSearch, pageNumber]);

    const loadMorePhotos = () => {
        setPage(page + 1);
        navigate(`/${page}`)
    }

    if (loading) return <p className={PhotosListCSS.loading}>Loading...</p>

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