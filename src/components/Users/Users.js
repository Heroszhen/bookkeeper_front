import './Users.css';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Formuser from '../Formuser/Formuser';
import { fetchGet } from '../../services/UtilService';
import { setUsers, updateUser, addUser } from '../../store/users.slice';
import moment from 'moment';
import User from '../../models/User';

export default function Users(props){
    const dispatch = useDispatch();
    let allusers = useSelector(state=>state.users);
    const [elmindex, setElmindex] = useState(null);
    const btnRef = useRef();
    const [userM, setUserM] = useState(null);

    useEffect(() => {
        props.setPage("users");
        getAllUsers();
    }, []);

    async function getAllUsers(){
        props.setLoading(true);
        let response = await fetchGet('users', dispatch);
        props.setLoading(false);
        if(response["status"] === 1){
            dispatch(setUsers(response["data"]))
        }
    }

    function OpenModal(){
        setElmindex(null);
        setUserM(new User());
        btnRef.current.click();
    }

    function getUpdatedUser(data_user){
        if(elmindex !== null)dispatch(updateUser({index:elmindex, user:data_user}));
        else dispatch(addUser(data_user));
    }

    return (
        <>
            <div id="users" className='template undernav'>
                <div className="container">
                    <div className="row pt-3">
                        <section className='col-12'>
                            <div className='d-flex align-items-center h2'>
                                <div>Les utilisateurs</div>
                                <div className='ms-2 pointer' onClick={()=>OpenModal()}>
                                    <i className="bi bi-plus-circle"></i>
                                </div>
                            </div>
                        </section>
                        <section className='col-12 msection'>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Prénom</th>
                                        <th scope="col">Photo</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">Créé</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allusers.map((user, index)=>{
                                        return <tr key={index} className={elmindex === index ? "active":""}>
                                            <td>{user["lastname"]}</td>
                                            <td>{user["firstname"]}</td>
                                            <td>
                                                {user["photo"] !== "" &&
                                                    <img src={user["photo"]} alt="" />
                                                }
                                            </td>
                                            <td>{user["email"]}</td>
                                            <td>{moment(user["created"]).format("DD/MM/YYYY hh:mm:ss")}</td>
                                            <td>
                                                <button type="button" className='btn btn-primary btn-sm me-2' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setElmindex(index);setUserM(allusers[index]);btnRef.current.click();}}>Modifier</button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <button type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={btnRef}></button>

            <div className="modal fade" id="exampleModal" tabIndex="-1"  data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Editer un utilisateur</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setUserM(null)}></button>
                        </div>
                        <div className="modal-body">
                            {userM !== null &&
                                <Formuser user={userM} getUpdatedUser={getUpdatedUser}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}