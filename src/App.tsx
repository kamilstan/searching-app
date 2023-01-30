import React, {useState} from 'react';

import { SearchContext } from './contexts/search.context';

import {SearchingBar} from "./components/SearchingBar/SearchingBar";
import {PhotosList} from "./components/PhotosList/PhotosList";

import AppCSS from './App.module.css';

function App() {

    const [search, setSearch] = useState("");
  return (

      <SearchContext.Provider value={{search, setSearch}}>
        <div className={AppCSS.wrapper}>
            <SearchingBar/>
            <PhotosList/>
        </div>
      </SearchContext.Provider>
  );
}

export default App;
