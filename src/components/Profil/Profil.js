import './Profil.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMe } from '../../store/me.slice';
import Formuser from '../Formuser/Formuser';

export default function Profil(props){
    const [section, setSection] = useState(1);
    const dispatch = useDispatch();
    let user = useSelector(state=>state.me);

    useEffect(() => {
        props.setPage("profil")
    }, []);

    function getUpdatedUser(data_user){
        dispatch(setMe(data_user))
    }
    
    return (
        <div id="profil" className='template undernav'>
            <div className='container pt-4'>
                <div className='row'>
                    <section className="col-12 page-title">Profile</section>
                    <section>
                        <div className="btn-group wrap-section-btns" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onChange={()=>setSection(1)} checked={section === 1}/>
                            <label className="btn btn-outline-dark btn-sm" htmlFor="btnradio1">Les informations</label>

                            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onChange={()=>setSection(2)} checked={section === 2} />
                            <label className="btn btn-outline-dark btn-sm" htmlFor="btnradio2">Changer le mot de passe</label>
                        </div>
                    </section>
                    <div className='col-12'>
                        {section === 1 &&
                            <section className="msection">
                                <Formuser user={user} getUpdatedUser={getUpdatedUser}/>
                            </section>
                        }
                        {section === 2 &&
                            <section className="msection">

                            </section>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}