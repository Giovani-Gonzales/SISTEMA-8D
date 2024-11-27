import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DwLogo from '../assets/DW.png';
import { HiMenu } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';

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
  cursor: pointer;

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

// Modal Container
const Modal = styled.div`
  display: ${({ showForm }) => (showForm ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1050;
  padding-top: 50px;
  text-align: center;
`;

// Modal Content
const ModalContent = styled.div`
  background-color: rgb(45, 45, 45); 
  color: white;
  padding: 20px;
  margin: 0 auto;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 
`;

// Modal Input Styles
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #444;
  color: white;
  border: 1px solid #555;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s ease;
  outline:none;

  &:focus {
    border-color: rgb(253, 185, 19);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #444;
  color: rgb(253, 185, 19);
  border: 1px solid #555;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s ease;
  outline:none;

  &:focus {
    border-color: rgb(253, 185, 19);
  }
`;

const Label = styled.label`
  color: rgb(253, 185, 19); 
  font-size: 1.1em;
  margin-bottom: 5px;
  display: block;
`;

const ButtonSubmit = styled.button`
  background-color: rgb(253, 185, 19);
  color: rgb(45,45,45);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    background-color: rgb(204, 153, 0);
  }
`;

const ButtonClose = styled(ButtonSubmit)`
  background-color: transparent;
  color: rgb(253, 185, 19);
  border: 1px solid rgb(253, 185, 19);
  margin-left: 10px;

  &:hover {
    background-color: rgb(253, 185, 19);
    color: rgb(45,45,45);
  }
`;

const Navbar = () => {
  const { logout, token } = useAuth();  // Certifique-se de que token está sendo passado de algum lugar, por exemplo, de um contexto de autenticação.
  const navigate = useNavigate();
  const offcanvasRef = useRef(null);

  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);

  // Fetch the companies list on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:3000/clientes');
        const data = await response.json();
        setCompanies(data); // Store the fetched companies in the state
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOpenForm = () => {
    setShowForm(true);
    if (offcanvasRef.current) {
      offcanvasRef.current.classList.remove('show');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    window.location.reload(); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
      department,
      company,
      id: Math.random().toString(36).substring(7) 
    };

    try {
      const response = await fetch('http://localhost:3000/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert('Usuário adicionado com sucesso!');
        handleCloseForm(); 
      } else {
        alert('Erro ao adicionar o usuário');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao adicionar o usuário');
    }
  };

  return (
    <>
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
          <div
            ref={offcanvasRef}
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <NavHeader className="offcanvas-header">
              <Logo src={DwLogo} alt="Logo DataWake" />
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </NavHeader>
            <NavBody className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 mt-3">
                {/* Exibe o item "Adicionar Usuário" apenas se o token for "Paranoa" */}
                {token === "Paranoa" && (
                  <NavbarItem className="nav-item" onClick={handleOpenForm}>
                    <NavbarLink className="nav-link">Adicionar Usuário</NavbarLink>
                  </NavbarItem>
                )}

                <NavbarItem className="nav-item">
                  <NavbarLink className="nav-link" onClick={handleLogout}>
                    Logout
                  </NavbarLink>
                </NavbarItem>
              </ul>
            </NavBody>
          </div>
        </div>
      </Nav>

      {/* Modal Formulário */}
      <Modal showForm={showForm}>
        <ModalContent>
          <h2>Adicionar Usuário</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <Label>Email:</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Senha:</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Departamento:</Label>
              <Input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Empresa:</Label>
              <Select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              >
                <option value="">Selecione uma empresa</option>
                {companies.map((empresa) => (
                  <option key={empresa.id} value={empresa.nome}>
                    {empresa.nome}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <ButtonSubmit type="submit">Salvar</ButtonSubmit>
              <ButtonClose type="button" onClick={handleCloseForm}>Fechar</ButtonClose>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;