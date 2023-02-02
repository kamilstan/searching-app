import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";

import { SearchContext } from './contexts/search.context';
import {PageContext} from "./contexts/page.context";
import {PhotosContext} from "./contexts/photos.context";

import {PhotoRecord} from "./types/photo/photo";
import {AppView} from "./views/AppView/AppView";
import {CachedHintsContext} from "./contexts/cachedHints.context";

function App() {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [photos, setPhotos] = useState<PhotoRecord[]>([]);
    const [cachedData, setCachedData] = useState<string[]>(() => {
        try {
            const value = localStorage.getItem("searchResults");
            return value ? JSON.parse(value) : [];
        } catch {
            return []
        }
    });
  return (

      <SearchContext.Provider value={{search, setSearch}}>
          <PageContext.Provider value={{page, setPage}}>
              <PhotosContext.Provider value={{photos, setPhotos}}>
                <CachedHintsContext.Provider value={{cachedData, setCachedData}}>
                <Routes>
                    <Route
                        path="/:pageNumber?"
                        element={<AppView />}
                    />

                </Routes>
                </CachedHintsContext.Provider>
              </PhotosContext.Provider>
          </PageContext.Provider>
      </SearchContext.Provider>
  );
}

export default App;
