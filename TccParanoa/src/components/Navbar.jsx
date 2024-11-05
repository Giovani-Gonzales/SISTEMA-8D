import React from 'react';
import styled from 'styled-components'

import { HiMenu } from "react-icons/hi";

const Nav = styled.nav`
  background-color: #263F8C;
  height: 5em;
`;

const Logo = styled.img`
    width: 13em;
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
    background-color: #263F8C;
    height: 5em;
`

const NavbarLink = styled.a`
    display: flex;
    width: 100%;
    weight:100%;
    padding: 10px;
    font-size: 1.5em;
    color: black;
    text-decoration: none;

    &:hover{
    color: #ffff;
    }
`

const NavbarItem = styled.li`
    height: 4em;
    width: 100%;
    padding-left: 1em;
    background-color: transparent;
    display:flex;
    align-items:center;
    transition: background-color 0.25s;

    &:hover {
        background-color: #71BBD9; 
    }
`

const NavBody = styled.div`
    background-color: #fff;
    height: 5em;
    padding: 0;

`

const Navbar = () => {
  return (
    <>
      <Nav className="navbar fixed-top">
        <div className="container-fluid">
          <Logo src='https://intranet.paranoa.com.br/assets/logo/500x250.png?v=1721063576'/>
          <Button
            className="teste"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <HiMenu style={{fontSize: '2.5em', color:'white'}}/>
          </Button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <NavHeader className="offcanvas-header">
                <Logo src='https://intranet.paranoa.com.br/assets/logo/500x250.png?v=1721063576'/>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </NavHeader>
            <NavBody className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 mt-3">
                    <NavbarItem className="nav-item">
                        <NavbarLink href="#">Item 1</NavbarLink>
                    </NavbarItem>

                    <NavbarItem className="nav-item">
                        <NavbarLink className="nav-link" href="#" >Item 2</NavbarLink>
                    </NavbarItem>

                    <NavbarItem className="nav-item">
                        <NavbarLink className="nav-link" href="#">Item 3</NavbarLink>
                    </NavbarItem>
                </ul>
            </NavBody>
          </div>
        </div>
      </Nav>
    </>
  );
}

export default Navbar;
