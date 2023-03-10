import {createContext} from "react";


export const CachedHintsContext = createContext({
    cachedData: [] as (string[]),
    setCachedData: (s: (prev: string[]) => string[])=> {},
})