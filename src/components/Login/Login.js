import './Login.css';
import React, { useState, useEffect } from 'react';
import { fetchPost } from '../../services/UtilService';

export default function Login (props){
    const [userM, setUserM] = useState({email:"", password:""});

    useEffect(() => {
        props.setPage("login");
    }, []);

    async function doLogin(e){
        e.preventDefault();
        props.setLoading(true);
        let response = await fetchPost('login', userM);
        props.setLoading(false);
        if(response["status"] === 1){
            localStorage.setItem("token", response["token"]);
        }else{
            alert("Erreurs");
        }
    }

    return (
        <div id="login" className='template'>
            <form onSubmit={(e)=>doLogin(e)}>
                <h1 className='text-center'>Connectez-vous</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail *</label>
                    <input type="email" className="form-control" id="email" name="email" defaultValue={userM["email"]} onChange={(e)=>setUserM({...userM, email:e.target.value})} />
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">Mot de passe *</label>
                    <input type="password" className="form-control" id="password" name="password" defaultValue={userM["password"]} onChange={(e)=>setUserM({...userM, password:e.target.value})} autoComplete="off" />
                </div>
                <div className="text-center">
                    <button type="submit" className='btn btn-primary'>Envoyer</button>
                </div>
            </form>
        </div>
    )
}