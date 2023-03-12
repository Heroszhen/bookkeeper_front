import './Nav.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import photo_profil from '../../assets/photo_profil.png';
import { fetchGet } from '../../services/UtilService';
import { logout } from '../../services/UtilService';
import { setMe } from '../../store/me.slice';

export default function Nav(props){
    const dispatch = useDispatch();
    let user = useSelector(state=>state.me)

    useEffect(() => {
        if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== "")getMyProfil();
    }, []);

    async function getMyProfil(){
        let response = await fetchGet('profil');
        if(response["status"] === -1)logout();
        else dispatch(setMe(response["data"]));
    }

    function deconnection(){
        logout()
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='/accueil'>Accueil</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='/utilisateurs'>Utilisateurs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='/credit'>Crédits</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='/debit'>Débits</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='/'>Statistiques</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to='/fichiers'>Fichiers</NavLink>
                        </li>
                    </ul>
                    <div>
                        {(localStorage.getItem("token") !== null && localStorage.getItem("token") !== "")&&
                            <div className="dropdown">
                                <div className="text-white" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img id="photo-profil" src={(user === null || user.photo === '')?photo_profil:user.photo} alt="" />
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <NavLink className={"dropdown-item " + (({ isActive }) => isActive ? 'nav-link active' : 'nav-link')} to='/mon-profile'>
                                            Bonjour
                                            {user != null &&
                                                <span> {user["lastname"]} {user["firstname"]}</span>
                                            }
                                        </NavLink>
                                    </li>
                                    <li>
                                        <div className="dropdown-item pointer" onClick={()=>deconnection()}>Déconnexion</div>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}