import React from 'react';
import SideBar from '../Sidebar/SideBar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}
export default MainLayout;
