import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Msgbox from '../components/Msgbox.jsx';
import CustomSelect from '../components/Select';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

const FormContainer = styled.div`
  background-color: rgb(45,45,45);
  padding: 2em;
  border-radius: 8px;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: ${props => (props.isVisible ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.3s ease, transform 0.3s ease;
  width: auto;
`;

const FormTitle = styled.h2`
  margin-bottom: 1em;
  font-size: 1.5em;
`;

const InputGroup = styled.div`
  margin-bottom: 0;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9em;
  margin-bottom: 0.5em;
  color: #fdb913;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  background-color: rgb(65,65,65);
  border: 1px solid rgb(253, 185, 19);
  color: rgb(253, 185, 19);
  font-size: 1em;
  border-radius: 4px;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    outline: none;
    border-color: rgb(253, 185, 19);
  }
`;


const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5em;
  gap:4em;
`;

const Button = styled.button`
  background-color: ${props => (props.primary ? 'rgb(253, 185, 19)' : 'rgb(75,75,75)')};
  color: white;
  padding: 0.5em 1.5em;
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${props => (props.primary && !props.disabled ? 'rgb(255, 165, 0)' : 'rgb(100, 100, 100)')};
  }
`;

const Form8D = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ numero8D: '' });
  const [message, setMessage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [colaboradores, setColaboradores] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    setIsVisible(true);

    const fetchColaboradores = async () => {
      try {
        const response = await fetch('http://localhost:3000/responsavel');
        if (response.ok) {
          const data = await response.json();
          setColaboradores(data.map(colaborador => ({
            id: colaborador.id,
            nome: colaborador.nome
          })));
        } else {
          console.error('Erro ao carregar colaboradores:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao carregar colaboradores:', error);
      }
    };

    fetchColaboradores();
  }, []);

  useEffect(() => {
    setIsVisible(true);

    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:3000/clientes');
        if (response.ok) {
          const data = await response.json();
          setClientes(data.map(cliente => ({
            id: cliente.id,
            nome: cliente.nome
          })));
        } else {
          console.error('Erro ao carregar clientes:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      numero8D: e.target.value,
    });
  };


  const handleSubmit = async () => {
    if (!formData.numero8D) {
      setMessage({ type: 'error', text: 'Por favor, preencha todos os campos!' });
      return;
    }

    const dataToSend = {
      ...formData,
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
    };

    try {
      const response = await fetch('http://localhost:3000/lista8d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Dados enviados com sucesso!' });
        setTimeout(() => handleClose(), 250);
      } else {
        console.error('Erro ao enviar os dados:', response.statusText);
        setMessage({ type: 'error', text: 'Erro ao enviar os dados. Tente novamente.' });
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setMessage({ type: 'error', text: 'Erro ao enviar os dados. Tente novamente.' });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
    window.location.reload(); 
  };

  const isFormValid = formData.numero8D.trim() !== '';

  return (
    <>
      <Overlay isVisible={isVisible} onClick={handleClose}>
        <FormContainer isVisible={isVisible} onClick={e => e.stopPropagation()}>
          <FormTitle>Formulário 8D</FormTitle>
          <InputGroup>
            <Label>N° DO 8D</Label>
            <Input
              type="text"
              value={formData.numero8D || ''}
              onChange={handleInputChange}
            />
            <Label>RESPONSÁVEL PELO 8D</Label>
            <CustomSelect 
              options={colaboradores} 
              onChange={(selectedOption) => setFormData({ ...formData, responsavel: selectedOption })}
              style={{marginBottom:"15px"}}
            />
            <Label>CLIENTE</Label>
            <CustomSelect 
              options={clientes} 
              onChange={(selectedOption) => setFormData({ ...formData, cliente: selectedOption })}
              style={{marginBottom:"15px"}}
            />
          </InputGroup>
          <ButtonGroup>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button primary onClick={handleSubmit} disabled={!isFormValid}>
              Enviar
            </Button>
          </ButtonGroup>
        </FormContainer>
      </Overlay>

      {message && (
        <Msgbox
          message={message.text}
          type={message.type}
          visible={true}
        />
      )}
    </>
  );
};

export default Form8D;
