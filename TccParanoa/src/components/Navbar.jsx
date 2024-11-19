import React from 'react';
import styled from 'styled-components';
import DwLogo from '../assets/DW.png';
import { HiMenu } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'; // Para navegação
import { useAuth } from '../pages/AuthContext'; // Para acessar o contexto de autenticação

const Nav = styled.nav`
  background-color: rgb(45,45,45);
  height: 120px;
`;

const Logo = styled.img`
  width: 100px;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 0;
  border: none;
  outline: none;
  transition: transform 0.25s; 

  &:hover {
    transform: scale(0.8); 
  }
`;

const NavHeader = styled.div`
  background-color: rgb(45,45,45); 
  height: 120px;
`;

const NavbarLink = styled.a`
  display: flex;
  width: 100%;
  padding: 10px;
  font-size: 1.5em;
  color: rgb(253, 185, 19);
  text-decoration: none;
`;

const NavbarItem = styled.li`
  height: 4em;
  width: 100%;
  padding-left: 1em;
  background-color: transparent;
  display: flex;
  align-items: center;
  transition: background-color 0.25s;

  &:hover {
    background-color: rgb(253, 185, 19); 
    color: #333;
  }
`;

const NavBody = styled.div`
  background-color: #333;
  height: 5em;
  padding: 0;
`;

const Navbar = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <Nav className="navbar">
      <div className="container-fluid">
        <Logo src={DwLogo} alt="Logo DataWake" />
        <Button
          className="teste"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <HiMenu style={{ fontSize: '2.5em', color: 'rgb(253, 185, 19)' }} />
        </Button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <NavHeader className="offcanvas-header">
            <Logo src={DwLogo} alt="Logo DataWake" />
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </NavHeader>
          <NavBody className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 mt-3">
              <NavbarItem className="nav-item">
                <NavbarLink className="nav-link" href="#">Item 1</NavbarLink>
              </NavbarItem>

              <NavbarItem className="nav-item">
                <NavbarLink className="nav-link" href="#">Item 2</NavbarLink>
              </NavbarItem>

              {/* Botão de Logout */}
              <NavbarItem className="nav-item">
                <NavbarLink className="nav-link"  onClick={handleLogout}>
                  Logout
                </NavbarLink>
              </NavbarItem>
            </ul>
          </NavBody>
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
