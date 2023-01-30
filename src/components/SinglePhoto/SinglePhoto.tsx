import React from "react";

import SinglePhotoCSS from "./SinglePhoto.module.css";

interface Props {
    src: string;
    description: string;
}

export const SinglePhoto = (props:Props) => {
    return (
        <figure className={SinglePhotoCSS.photo}>
            <img  className={SinglePhotoCSS.img} src={props.src} alt={props.description || "photo"}/>
        </figure>
    )
}