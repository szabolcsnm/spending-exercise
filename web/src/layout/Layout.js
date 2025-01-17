import React from 'react';
import Header from '../components/Header';
import { MainContainer } from '../styles/ComponentStyles';

const Layout = ({ children }) => (
  <>
    <Header />
    <MainContainer>{children}</MainContainer>
  </>
);

export default Layout;
