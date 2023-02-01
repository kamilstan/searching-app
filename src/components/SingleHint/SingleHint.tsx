import React, {SyntheticEvent} from "react";

import SingleHintCSS from "./SingleHint.module.css";

interface Props {
    title: string;
    handleSearchFromHint: (e:SyntheticEvent, value:string) => void;
}

export const SingleHint = (props:Props) => {
    return (
        <>
            <p
                className={SingleHintCSS.hint}
                onClick={e => props.handleSearchFromHint(e , props.title)}
            >
                {props.title}
            </p>
        </>

    )
}