import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px), translateX(-50%); 
  }
  to {
    opacity: 1;
    transform: translateY(0), translateX(-50%);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0), translateX(-50%);
  }
  to {
    opacity: 0;
    transform: translateY(20px), translateX(-50%);
  }
`;

const MessageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(253, 185, 19);
  color: rgb(45,45,45);
  padding: 1em 2em;
  border-radius: 8px;
  font-size: 1.2em;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  position: fixed;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  max-width: 90%;
  animation: ${props => (props.visible ? fadeIn : fadeOut)} 0.3s ease-in-out;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const Icon = styled.div`
  margin-right: 1em;
  font-size: 1.8em;
`;

const Msgbox = ({ message, type, visible }) => {
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setMessageData(prevState => ({ ...prevState, visible: false }));
      }, 3000);
    }
  }, [visible]);

  return (
    <MessageBox visible={visible}>
      <Icon>
        {type === 'success' ? <FiCheckCircle /> : <FiXCircle />}
      </Icon>
      {message}
    </MessageBox>
  );
};

export default Msgbox;
