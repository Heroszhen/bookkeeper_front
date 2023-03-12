import './Formuser.css';
import React from 'react';
import { useFormik } from 'formik';
import { readFile } from '../../services/UtilService';
import { fetchPost } from '../../services/UtilService';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../store/common.slice';

export default function Formuser(props){
    let user = props.user;
    const dispatch = useDispatch();
    
    const formik = useFormik({
        initialValues: user,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if(Object.keys(formik.errors).length === 0){
                dispatch(setLoader(true));
                let response;
                if(values._id !== null)response = await fetchPost(`user/${values._id}`, values, dispatch);
                else response = await fetchPost(`user`, values, dispatch);
                dispatch(setLoader(false));
                if(response["status"] === -1)alert("Erreurs");
                else{
                    if(response["status"] === 1){
                        if(props.getUpdatedUser !== null)props.getUpdatedUser(response["data"]);
                        alert("Enregistrer")
                    }else if(response["status"] === 2){
                        alert("Il existe un utilisateur avec ce mail")
                    }    
                }
            }
        },
        validate:validate
    });
    

    function validate(formValues){
        let errors = {};
        if(formValues.lastname === ""){
            errors.lastname = "Le nom est obligatore";
        }
        if(formValues.firstname === ""){
            errors.firstname = "Le prénom est obligatore";
        }
        if(formValues.email === ""){
            errors.email = "Le mail est obligatore";
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)){
            errors.email = "Le format du mail n'est pas valide";
        }
        return errors
    }

    async function handleFile(e){
        let base64 = (await readFile(e.target.files.item(0))).target.result;
        formik.setFieldValue("photo", base64);
    }

    return (
        <div id="formuser">
            {(user !== null && formik.values !== null) &&
                <form onSubmit={formik.handleSubmit}>
                    <div className='row'>
                        <div className="mb-4 col-md-6">
                            <label htmlFor="lastname" className="form-label">Nom</label>
                            <input 
                                type="text" className="form-control" id="lastname" name="lastname" 
                                {...formik.getFieldProps('lastname')}/>
                            {(formik.errors != null && formik.errors.lastname != null && formik.touched.lastname) &&
                                <div className='alert alert-danger mt-1'>{formik.errors.lastname}</div>
                            }
                        </div>
                        <div className="mb-4 col-md-6">
                            <label htmlFor="firstname" className="form-label">Prénom</label>
                            <input 
                                type="text" className="form-control" id="firstname" name="firstname" 
                                defaultValue={formik.values.firstname} 
                                onChange={(e)=>formik.setFieldValue('firstname', e.target.value)}
                                onBlur={formik.handleBlur}/>
                            {(formik.errors != null && formik.errors.firstname != null && formik.touched.firstname) &&
                                <div className='alert alert-danger mt-1'>{formik.errors.firstname}</div>
                            }
                        </div>
                        <div className="mb-4 col-md-6">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" 
                                defaultValue={formik.values.email} 
                                onChange={(e)=>formik.setFieldValue('email', e.target.value)}
                                onBlur={formik.handleBlur}/>
                            {(formik.errors != null && formik.errors.email != null && formik.touched.email) &&
                                <div className='alert alert-danger mt-1'>{formik.errors.email}</div>
                            }
                        </div>
                        <div className="mb-4 col-md-6">
                            <label htmlFor="created" className="form-label">Date de création</label>
                            <input type="text" className="form-control" id="created" name="created" defaultValue={formik.values.created} disabled />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="formFile" className="form-label">Photo de profile</label>
                            <input className="form-control" type="file" id="formFile" onChange={(e)=>handleFile(e)} />
                        </div>
                        <div className="mb-3 col-md-6 text-center">
                            {formik.values.photo !== '' &&
                                <img src={formik.values.photo} alt="" />
                            }
                        </div>
                        <div className='text-center'>
                            <button type="submit" className='btn btn-primary'>Envoyer</button>
                        </div>
                    </div>
                </form>
            }
        </div>
    )
}