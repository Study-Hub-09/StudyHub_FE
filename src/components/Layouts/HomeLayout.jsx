import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';

function HomeLayout() {
  return (
    <StMainLayout>
      <Header />
      <Outlet />
    </StMainLayout>
  );
}

export default HomeLayout;

const StMainLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
