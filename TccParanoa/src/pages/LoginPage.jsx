import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DwLogo from '../assets/DW.png';
import Msgbox from '../components/Msgbox';
import { useAuth } from './AuthContext';

const ContainerLogin = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh; 
    background-color: rgb(45,45,45); 
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5em;
  padding-right: 2.5em; /* Espaço para o ícone do olho */
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
  top: 39%;
  right: 10px;
  transform: translateY(-50%); /* Centraliza o ícone verticalmente */
  color: rgb(253, 185, 19);
  cursor: pointer;
`;

const Logo = styled.img`
  width: 70px;
`;

const BoxLogin = styled.div`
    padding: 20px;
    border-radius: 8px;
    width: 500px;
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  color: rgb(253, 185, 19);
  margin-bottom: 10px;
`;

const SectionDivider = styled.hr`
  border: none;
  border-top: 2px solid rgb(253, 185, 19);
  margin: 1em 0;
  flex-direction: column;
`;

const FormBody = styled.div`
    text-align: center;
`;

const ButtonForm = styled.button`
  background-color: rgb(253, 185, 19);
  color: rgb(45,45,45);
  padding: 0.5em 1.5em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: rgb(255, 165, 0);
  }
`;

const LoginPage = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [msgBoxVisible, setMsgBoxVisible] = useState(false); 
  const [msgSimbol, setMsgSimbol] = useState('');
  
  const { login } = useAuth(); // Obtendo a função login do contexto
  
  const toggleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/accounts');
      const accounts = await response.json();

      const account = accounts.find(acc => acc.email === email && acc.password === password);

      if (account) {
        setErrorMessage('Login Bem Sucedido!');
        setMsgSimbol('success');
        setMsgBoxVisible(true);
        login(); // Chamando o login do contexto para redirecionar
        setTimeout(() => setMsgBoxVisible(false), 3000); 
      } else {
        setErrorMessage('Email ou senha inválidos!');
        setMsgSimbol('error');
        setMsgBoxVisible(true);
        setTimeout(() => setMsgBoxVisible(false), 3000);  
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      setMsgSimbol('error');
      setMsgBoxVisible(true);  
      setTimeout(() => setMsgBoxVisible(false), 3000);  
    }
  };

  return (
    <ContainerLogin>
      <BoxLogin>
        <FormBody>
          <Logo src={DwLogo} />
          <p></p>
          
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

          <SectionDivider />
          <ButtonForm onClick={handleLogin}>Entrar</ButtonForm>
        </FormBody>
      </BoxLogin>

      <Msgbox message={errorMessage} type={msgSimbol} visible={msgBoxVisible} />
    </ContainerLogin>
  );
};

export default LoginPage;