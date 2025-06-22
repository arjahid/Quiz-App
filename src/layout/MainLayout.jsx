import React from 'react';
import Home from '../components/page/Home';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <div className='min-h-screen w-11/12 mx-auto p-4'>
           
           <Home></Home>

           <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;