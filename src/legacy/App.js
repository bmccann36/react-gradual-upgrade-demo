/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {Suspense, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ThemeContext from './shared/ThemeContext';
import {DataGridPro} from "@mui/x-data-grid-pro";

export default function App() {
  const [theme, setTheme] = useState('slategrey');

  function handleToggleClick() {
    if (theme === 'slategrey') {
      setTheme('hotpink');
    } else {
      setTheme('slategrey');
    }
  }

  const rows = [
    {id: 1, col1: 'Hello', col2: 'World'},
    {id: 2, col1: 'XGrid', col2: 'is Awesome'},
    {id: 3, col1: 'Material-UI', col2: 'Rocks'},
    // more data...
  ];

  const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'col1', headerName: 'Column 1', width: 130},
    {field: 'col2', headerName: 'Column 2', width: 130},
  ];

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <div style={{fontFamily: 'sans-serif'}}>
          <div
            style={{
              margin: 20,
              padding: 20,
              border: '1px solid black',
              minHeight: 300,
            }}>
            <button onClick={handleToggleClick}>Toggle Theme Context</button>
            <br/>
            <Suspense fallback={<Spinner/>}>
              <Routes>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/" element={<HomePage/>}/>
              </Routes>
            </Suspense>
          </div>
          <div style={{height: 400, width: '100%'}}>
            <DataGridPro rows={rows} columns={columns} pageSize={5} checkboxSelection/>
          </div>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

function Spinner() {
  return null;
}
