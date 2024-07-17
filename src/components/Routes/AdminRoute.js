import { useState, useEffect } from 'react';
import { useAuth } from '../../context/Auth';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function AdminRoute() {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);
    // const navigate = useNavigate();

    const authCheck = async () => {
        try{
        const res1 = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
        
        if (res1.data.ok) {
            setOk(true);
        } else {
            setOk(false);
        }
    }catch (error){
        // console.log(error);
    }
    };

    useEffect(() => {

        if (auth?.token) { authCheck() };
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner path='' />;


}