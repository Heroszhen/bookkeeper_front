import './App.css';
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import PrivateRoutes from "./services/PrivateRoutesService.js";
import LoginRoute from "./services/LoginRouteService.js";
import { RotatingLines } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

//components
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Users from './components/Users/Users';
import Notfound from './components/Notfound/Notfound';
import Profil from './components/Profil/Profil';
import Credit from './components/Credit/Credit';
import Debit from './components/Debit/Debit';
import Files from './components/Files/Files';

const App=() =>{
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(false);
  let loader = useSelector(state=>state.common.loader);

  return (
    <div id="App">
      {page !== "login" && <Nav page={page} />}
      <Routes>
        <Route element={<LoginRoute />}>
          <Route path="/" element={<Login setPage={setPage} setLoading={setLoading} />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/accueil" element={<Home setPage={setPage} />} />
          <Route path="/utilisateurs" element={<Users setPage={setPage} setLoading={setLoading} />} />
          <Route path="/mon-profile" element={<Profil setPage={setPage} />} />
          <Route path="/credit" element={<Credit setPage={setPage} />} />
          <Route path="/debit" element={<Debit setPage={setPage} />} />
          <Route path="/fichiers" element={<Files setPage={setPage} />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>

      {(loading === true || loader === true) &&
        <div id='wrap-loader'>
          <RotatingLines
              strokeColor="grey"
              visible={true}
              height="120"
              width="120"
              ariaLabel="blocks-loading"
          />
        </div>
      }
      
    </div>
  );
}

export default App;
