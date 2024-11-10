import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Msgbox from '../components/Msgbox.jsx';

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
  max-width: 400px;
  width: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: ${props => (props.isVisible ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const FormTitle = styled.h2`
  margin-bottom: 1em;
  font-size: 1.5em;
`;

const InputGroup = styled.div`
  margin-bottom: 1em;
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

  ${props => props.error && `
    border-color: red;
  `}

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    outline: none;
    border-color: rgb(253, 185, 19);
  }
`;

const ImageInput = styled.input`
  display: block;
  margin-top: 1em;
  width: 100%;
  background-color: rgb(65,65,65);
  color: rgb(253, 185, 19);
  padding: 0.5em;
  border: 1px solid rgb(253, 185, 19);
  border-radius: 4px;

  &::file-selector-button {
    background-color: rgb(253, 185, 19);
    color: black;
    border: none;
    padding: 0.3em 0.5em;
    margin-right: 0.5em;
    cursor: pointer;
    border-radius: 4px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5em;
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

const Form8D = ({ questions, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e, question) => {
    setFormData({
      ...formData,
      [question]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (Object.values(formData).some(value => !value) || !imageData) {
      setMessage({ type: 'error', text: 'Por favor, preencha todos os campos e selecione uma imagem!' });
      return;
    }

    const dataToSend = {
      ...formData,
      image: imageData, // image in base64
    };

    try {
      const response = await fetch('http://localhost:3001/lista8d', {
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
  };

  const isFormValid = Object.values(formData).length === questions.length &&
    Object.values(formData).every(value => value.trim() !== '') && imageData;

  return (
    <>
      <Overlay isVisible={isVisible} onClick={handleClose}>
        <FormContainer isVisible={isVisible} onClick={e => e.stopPropagation()}>
          <FormTitle>Formulário 8D</FormTitle>
          {questions.map((question, index) => (
            <InputGroup key={index}>
              <Label>{question}</Label>
              <Input
                type="text"
                value={formData[question] || ''}
                onChange={(e) => handleInputChange(e, question)}
                error={!formData[question]} 
              />
            </InputGroup>
          ))}
          <InputGroup>
            <Label>Envie uma imagem:</Label>
            <ImageInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
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
