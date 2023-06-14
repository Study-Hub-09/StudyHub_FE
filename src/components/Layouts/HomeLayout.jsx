import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from '../Layouts/Footer';
import styled from 'styled-components';

function HomeLayout() {
  return (
    <StMainLayout>
      <Header />
      <Outlet />
      <Footer />
    </StMainLayout>
  );
}

export default HomeLayout;

const StMainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
