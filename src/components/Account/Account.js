import './Account.css';
import React, { useState, useEffect, useRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetAccountsByType } from '../../store/accounts.slice';
import { fetchGet, clone } from '../../services/UtilService';
import ReactPaginate from 'react-paginate';
import AccountModel from '../../models/AccountModel' ;
import { useFormik } from 'formik';
import _ from "lodash";

export default function Account(props){
    const type = props.type;
    const dispatch = useDispatch();
    let allaccounts = useSelector(state=>state.accounts);
    const [allusers, setAllusers] = useState([]);
    const [allmodes, setAllmodes] = useState([]);
    const [elmindex, setElmindex] = useState(null);
    const [modal, setModal] = useState(false);
    const btnModalRef = useRef();
    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 9;
    const pagesVisited = pageNumber * itemsPerPage; 
    const pageCount = Math.ceil(allaccounts.length / itemsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const formik = useFormik({
        initialValues: null,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if(Object.keys(formik.errors).length === 0){
                console.log(values)
            }
        },
        validate:validate
    });

    function validate(formValues){
        let errors = {};
        if(formValues.title === ""){
            errors.title = "Le titre est obligatore";
        }
        if(formValues.amount === ""){
            errors.amount = "Le montant est obligatore";
        }
        if(formValues.mode === null){
            errors.mode = "Le mode de paiement est obligatore";
        }
        return errors
    };

    useEffect(() => {
        getAllOptions();
        dispatch(fetchGetAccountsByType(type, dispatch));
    }, []);

    async function getAllOptions(){
        let response = await fetchGet('users', dispatch);
        if(response["status"] === 1){
            setAllusers(response["data"]);
        }
        response = await fetchGet("options", dispatch);
        if(response["status"] === 1){
            setAllmodes(response["data"]);
        }
    }

    function switchModal(e, action = 0, index = null){
        e.preventDefault();
        setElmindex(index);
        if(action === 0){
            formik.setValues(null);
            return;
        }
        let model = new AccountModel();
        model.type = type;
        if(index === null){
            //model.mode = allmodes[0];
        }else{
            let key = pageNumber * itemsPerPage + index;
            Object.assign(model, allaccounts[key]);
        }console.log(model)
        formik.setValues(model);
        btnModalRef.current.click();
    }

    function setMode(id){
        let mode = null
        for(let entry of allmodes){
            if(entry["_id"] === id){
                mode = entry;
                break;
            }
        }
        formik.setFieldValue('mode', mode);
    }

    function hasUser(id){
        for(let entry of formik.values.authors){
            if(entry._id === id)return true;
        }
        return false;
    }
    
    function switchUser(e, key){
        let tab = clone(formik.values.authors);
        if(e.target.checked === true){
            tab.push(allusers[key]); 
        }else{
            tab = tab.filter(elm => elm._id !== allusers[key]['_id'])
        }
        formik.setFieldValue("authors", tab);console.log(formik)
    }

    return (
        <>
            <div id="accounts">
                <div className="container pt-3">
                    <div className='row'>
                        <section className='col-12'>
                            <div className='d-flex align-items-center h2'>
                                <div>
                                    {type === 1 
                                        ? <span>Les crédits</span>
                                        : <span>Les débits</span>
                                    }
                                </div>
                                <div className='ms-2 pointer' onClick={(e)=>switchModal(e, 1)}>
                                    <i className="bi bi-plus-circle"></i>
                                </div>
                            </div>
                        </section>
                        <section className='col-12 wrap-list msection'>
                            <section className="wrap-table">
                                <table className="table table-hover">
                                    <thead className="table table-dark">
                                        <tr>
                                            <th scope="col">Titre</th>
                                            <th scope="col">Montant</th>
                                            <th scope="col">Qui</th>
                                            <th scope="col">Paiement</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Créé</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        allaccounts
                                        .slice(pagesVisited, pagesVisited + itemsPerPage)
                                        .map((item, key) => {
                                            return (
                                                <tr className={elmindex === key ? "account active" : "account"} key={key} >
                                                    <td>{item.title}</td>
                                                    <td>
                                                        {type === 2 && <span>-</span>}
                                                        {item.amount}
                                                    </td>
                                                    <td>
                                                        {
                                                            item['authors'].map((item2, key) => {
                                                                return (
                                                                    <div key={key}>{item2.lastname} {item2.firstname}</div>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                    <td>
                                                        {item.mode !== null && item.mode.name}
                                                    </td>
                                                    <td className='td-description' >
                                                        <div className='wrap-description' onClick={()=>setElmindex(key)}>{item.description.slice(0, 19)}</div>
                                                        <div className='completed-description' onClick={()=>setElmindex(null)}>{item.description}</div>
                                                    </td>
                                                    <td>{item.created}</td>
                                                    <td>
                                                        <button type='button' className="btn btn-info btn-sm text-white me-2 mb-1" onClick={(e)=>switchModal(e,1, key)}>Modifier</button>
                                                        <button type='button' className="btn btn-danger btn-sm">Supprimer</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            </section>

                            {allaccounts.length > 0 &&
                                <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                />
                            }
                        </section>
                    </div>
                </div>
            </div>  

            {/* Button trigger modal */}
            <button type="button" className='d-none' data-bs-toggle="modal" data-bs-target="#exampleModal" ref={btnModalRef}></button>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {elmindex === null
                                    ?<span>Ajouter</span>
                                    :<span>Modifier</span>
                                }
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {formik.values != null &&
                                <form className='row' onSubmit={formik.handleSubmit}>
                                    <div className='col-12 mb-2'>
                                        <label htmlFor="title" className="form-label">Titre *</label>
                                        <input  type="text" className="form-control" id="title" name="title"
                                        {...formik.getFieldProps('title')}/>
                                        {(formik.errors != null && formik.errors.title != null && formik.touched.title) &&
                                            <div className='alert alert-danger mt-1'>{formik.errors.title}</div>
                                        }
                                    </div>    
                                    <div className='col-md-6 mb-2'>
                                        <label htmlFor="amount" className="form-label">Montant *</label>
                                        <input  type="text" className="form-control" id="amount" name="amount"
                                        {...formik.getFieldProps('amount')}/>
                                        {(formik.errors != null && formik.errors.amount != null && formik.touched.amount) &&
                                            <div className='alert alert-danger mt-1'>{formik.errors.amount}</div>
                                        }
                                    </div>
                                    <div className='col-md-6 mb-2'>{console.log(formik.values, allmodes)}
                                        <label htmlFor="mode" className="form-label">Mode de paiement *</label>
                                        <select className="form-select" id="mode" name="mode" defaultValue={formik.values.mode == null?-1:formik.values.mode._id} onChange={(e)=>setMode(e.target.value)}>
                                            <option value="-1">Sélectionnez un moyen de paiement</option>
                                        {   
                                            allmodes.map((item, key) => {
                                                return (
                                                    <option key={key} value={item._id}>{_.capitalize(item.name)}</option>
                                                )
                                            })
                                        }
                                        </select>
                                    </div>
                                    <div className='col-12 mb-2'>
                                        <label className="form-label">Utilisateurs</label>
                                        <div className='list-users form-control p-3'>
                                            {
                                                allusers.map((item, key)=>{
                                                    return (
                                                        <div className="form-check mb-1" key={key}>
                                                            <input className="form-check-input" type="checkbox" checked={hasUser(item._id)} onChange={(e)=>switchUser(e, key)} />
                                                            <label className="form-check-label" >{item.lastname} {item.firstname}</label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='col-12 mb-2'>
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea  type="text" className="form-control" id="description" name="description" row="3"
                                        {...formik.getFieldProps('description')} ></textarea>
                                    </div>
                                    <div className='col-12 text-center'>
                                        <button type="submit" className='btn btn-primary'>Envoyer</button>
                                    </div>
                                </form>   
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}