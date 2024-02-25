import React from 'react';
import {Routes,Route} from "react-router-dom"
import App from "./App";
import Error from "./Error";
import AdminLogin from "./AdminLogin";
import '../styles.css'
import '../media.css'
import AdminPanel from "./AdminPanel";
import {useSelector} from "react-redux";

const Router = () => {
    const isAuth = useSelector(state => state.user.userIsAuth)
    return (
        <div>
            <Routes>
                <Route path='/' element={<App/>} />
                <Route path='/adminLogin' element={<AdminLogin/>}/>
                {isAuth ? <Route path='/adminPanel' element={<AdminPanel/>}/> : null}
                <Route path='*' element={<Error/>} />
            </Routes>
        </div>
    );
};

export default Router;