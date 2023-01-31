import React, {useState} from 'react';

import { SearchContext } from './contexts/search.context';
import {PageContext} from "./contexts/page.context";

import {SearchingBar} from "./components/SearchingBar/SearchingBar";
import {PhotosList} from "./components/PhotosList/PhotosList";

import AppCSS from './App.module.css';

function App() {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
  return (

      <SearchContext.Provider value={{search, setSearch}}>
          <PageContext.Provider value={{page, setPage}}>
            <div className={AppCSS.wrapper}>
                <SearchingBar/>
                <PhotosList/>
            </div>
          </PageContext.Provider>
      </SearchContext.Provider>
  );
}

export default App;
