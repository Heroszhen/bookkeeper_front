import { Outlet, Navigate } from 'react-router-dom'

const LoginRouteService = () => {
    let notauth = (localStorage.getItem('token') == null);
    return(
        notauth ? <Outlet/> : <Navigate to="/accueil"/>
    )
}

export default LoginRouteService;