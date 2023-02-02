import React, {SyntheticEvent} from "react";

import SingleCachedHintCSS from "./SingleCachedHint.module.css";

interface Props {
    handleSearchFromCachedData: (e:SyntheticEvent, item:string) => void;
    item: string;
}

export const SingleCachedHint = (props:Props) => {
    return (
        <p
           className={SingleCachedHintCSS.hint}
           onClick={e =>props.handleSearchFromCachedData(e, props.item)}
        >
            {props.item}
        </p>

    )
}