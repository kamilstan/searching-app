import {createContext} from "react";
import {PhotoRecord} from "../types/photo/photo";

export const PhotosContext = createContext({
    photos: [] as PhotoRecord[],
    setPhotos: (s:PhotoRecord[]) => {} ,
})