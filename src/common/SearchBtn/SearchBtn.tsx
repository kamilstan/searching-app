import React from "react";

import SearchBtnCSS from "./SearchBtn.module.css";

interface Props {
    handleClick?: () => void;
    src: string;
    alt: string;
}

export const SearchBtn = (props: Props) => {
    return (
        <button onClick={props.handleClick} className={SearchBtnCSS["btn-exit"]}>
            <img src={props.src} alt={props.alt} className={SearchBtnCSS.icon} />
        </button>
    )
}