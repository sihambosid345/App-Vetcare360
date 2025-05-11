import React from 'react';
import { Container } from 'react-bootstrap';
import './global.css'; 

const HomePage = () => {
  return (
    <div className="home-background">
      <Container className="content-box text-center p-5">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="logo mb-3"
        />
        <h1 className="mb-4">Welcome</h1>
        <img
          src="/images/photo.png"
          alt="Pets"
          className="main-image"
        />
        <div className="mt-4">
          <img
            src="/images/der.png"
            alt="Spring Logo"
            className="footer-logo"
          />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
