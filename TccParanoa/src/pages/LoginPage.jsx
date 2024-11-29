import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Hook para acessar o contexto
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DwLogo from '../assets/logo-datawake-w.png'; // Caminho correto da logo
import Msgbox from '../components/Msgbox';

// Estilos
const ContainerLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgb(45, 45, 45);
`;

const BoxLogin = styled.div`
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  text-align: center;
`;

const Logo = styled.img`
  width: 200px;
  margin-bottom: 20px;
`;

const IntroText = styled.p`
  color: #fff;
  margin-bottom: 30px;
  font-size: 1.2em;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  background-color: rgb(65, 65, 65);
  border: 1px solid rgb(253, 185, 19);
  color: rgb(253, 185, 19);
  border-radius: 4px;
  font-size: 1em;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    outline: none;
    border-color: rgb(253, 185, 19);
  }
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const EyeIcon = styled.div`
  position: absolute;
  top: 15%;
  right: 10px;
  color: rgb(253, 185, 19);
  cursor: pointer;
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 1.2em;
  color: rgb(253, 185, 19);
  margin-bottom: 10px;
  text-align: left;
`;

const ButtonForm = styled.button`
  background-color: rgb(253, 185, 19);
  color: rgb(45, 45, 45);
  padding: 0.5em 1.5em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: rgb(255, 165, 0);
  }
`;

// Página de Login
const LoginPage = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [msgBoxVisible, setMsgBoxVisible] = useState(false);
  const [msgSimbol, setMsgSimbol] = useState(''); // Para mostrar o ícone correto no Msgbox

  const { login, token } = useAuth(); // Hook para acessar o token do AuthContext
  const navigate = useNavigate();

  // Verifica se o usuário já está logado
  useEffect(() => {
    if (token) {
      navigate('/dashboard'); // Se já tiver token, vai para o dashboard
    }
  }, [token, navigate]);

  const toggleViewPassword = () => setViewPassword(!viewPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://my-json-server.typicode.com/Giovani-Gonzales/bd-8d/accounts');
      const accounts = await response.json();
  
      // Verifica as credenciais
      const user = accounts.find(
        (account) => account.email === email && account.password === password
      );
  
      if (user) {
        const token = user.company; // Usando o `id` como token
        localStorage.setItem('authToken', token);
        login(token); // Atualiza o estado global
  
        setErrorMessage('Login Bem Sucedido!');
        setMsgSimbol('success');
        setMsgBoxVisible(true);
  
        setMsgBoxVisible(true);
        navigate('/dashboard')
        window.location.reload();    
      } else {
        setErrorMessage('Email ou senha inválidos!');
        setMsgSimbol('error');
        setMsgBoxVisible(true);
        setTimeout(() => setMsgBoxVisible(false), 3000);
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar ao servidor.');
      setMsgSimbol('error');
      setMsgBoxVisible(true);
      setTimeout(() => setMsgBoxVisible(false), 3000);
    }
  };
  

  return (
    <ContainerLogin>
      <BoxLogin>
        <Logo src={DwLogo} alt="Logo DataWake" />
        <IntroText>
          Bem-vindo ao <b style={{ color: 'rgb(253, 185, 19)' }}>PORTAL 8D</b>!
        </IntroText>

        <form onSubmit={handleLogin}>
          <FilterLabel>Login</FilterLabel>
          <StyledInput
            type="text"
            placeholder="Digite seu login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FilterLabel>Senha</FilterLabel>
          <PasswordContainer>
            <StyledInput
              type={viewPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <EyeIcon onClick={toggleViewPassword}>
              {viewPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeIcon>
          </PasswordContainer>
          <ButtonForm type="submit">Entrar</ButtonForm>
        </form>
      </BoxLogin>

      <Msgbox message={errorMessage} type={msgSimbol} visible={msgBoxVisible && errorMessage} />
    </ContainerLogin>
  );
};

export default LoginPage;