import React, {ChangeEvent} from "react";

import SearchInputCSS from "./SearchInput.module.css";

interface Props {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
}

export const SearchInput = (props:Props) => {
    return (
        <input className={SearchInputCSS.input}
               type={props.type}
               placeholder={props.placeholder}
               value={props.value}
               onChange={props.onChange}
               onFocus={props.onFocus}
               onBlur={props.onBlur}
        />
    )
}