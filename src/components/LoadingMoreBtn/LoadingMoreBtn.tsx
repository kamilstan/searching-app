import React, {useContext} from "react";

import LoadingMoreBtnCSS from "./LoadingMoreBtn.module.css";
import {Link} from "react-router-dom";
import {PageContext} from "../../contexts/page.context";

interface Props {
    loadMorePhotos: () => void;
}

export const LoadingMoreBtn = (props: Props) => {

    const {page} = useContext(PageContext);

    return (
        <Link to={`/${page + 1 }`}>
            <button
                className={LoadingMoreBtnCSS.btn}
                onClick={props.loadMorePhotos}
            >
                Load more
            </button>
        </Link>
    )
}