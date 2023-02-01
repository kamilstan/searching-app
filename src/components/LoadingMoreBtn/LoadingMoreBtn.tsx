import React from "react";

import LoadingMoreBtnCSS from "./LoadingMoreBtn.module.css";

interface Props {
    loadMorePhotos: () => void;
}

export const LoadingMoreBtn = (props: Props) => {

    return (
        <button
            className={LoadingMoreBtnCSS.btn}
            onClick={props.loadMorePhotos}
        >
            Load more
        </button>
    )
}