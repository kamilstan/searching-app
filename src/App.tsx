import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";

import { SearchContext } from './contexts/search.context';
import {PageContext} from "./contexts/page.context";
import {PhotosContext} from "./contexts/photos.context";

import {PhotoRecord} from "./types/photo/photo";
import {AppView} from "./views/AppView/AppView";

function App() {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [photos, setPhotos] = useState<PhotoRecord[]>([]);
  return (

      <SearchContext.Provider value={{search, setSearch}}>
          <PageContext.Provider value={{page, setPage}}>
              <PhotosContext.Provider value={{photos, setPhotos}}>
                <Routes>
                    <Route
                        path="/:pageNumber?"
                        element={<AppView />}
                    />

                </Routes>
              </PhotosContext.Provider>
          </PageContext.Provider>
      </SearchContext.Provider>
  );
}

export default App;
