import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from './auth';

const Logout = () => {
  AuthService.logout();
  return <Redirect to="/login" />;
};

export default Logout;
