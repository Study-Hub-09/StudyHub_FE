import React from 'react';
import SideBar from '../Sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function MainLayout() {
  return (
    <StMainLayout>
      <SideBar />
      <Outlet />
    </StMainLayout>
  );
}
export default MainLayout;

const StMainLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: rgba(230, 234, 224, 0.3);
`;
