import React from 'react';
import { Helmet } from 'react-helmet-async';
// sections
import Login from '../../sections/auth/Login';
// ----------------------------------------------------------------------

export const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <Login />
    </>
  );
}
