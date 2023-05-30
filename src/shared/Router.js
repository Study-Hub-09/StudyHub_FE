import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeLayout from '../components/Layouts/HomeLayout';
import MainLayout from '../components/Layouts/MainLayout';
import Home from '../pages/Home';
import Main from '../pages/Main';
import MyPage from '../pages/Mypage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Room from '../pages/Room';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/room/:id/detail" element={<Room />} />
        </Route>

        <Route path="/members/login" element={<Login />} />
        <Route path="/members/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
