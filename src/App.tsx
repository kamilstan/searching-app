import React, {useState} from 'react';

import { SearchContext } from './contexts/search.context';
import {PageContext} from "./contexts/page.context";
import {PhotosContext} from "./contexts/photos.context";

import {SearchingBar} from "./components/SearchingBar/SearchingBar";
import {PhotosList} from "./components/PhotosList/PhotosList";

import AppCSS from './App.module.css';
import {PhotoRecord} from "./types/photo/photo";

function App() {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [photos, setPhotos] = useState<PhotoRecord[]>([]);
  return (

      <SearchContext.Provider value={{search, setSearch}}>
          <PageContext.Provider value={{page, setPage}}>
              <PhotosContext.Provider value={{photos, setPhotos}}>
                <div className={AppCSS.wrapper}>
                    <SearchingBar/>
                    <PhotosList/>
                </div>
              </PhotosContext.Provider>
          </PageContext.Provider>
      </SearchContext.Provider>
  );
}

export default App;
