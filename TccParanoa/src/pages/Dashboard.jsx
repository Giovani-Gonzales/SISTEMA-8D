import React from 'react';
import styled from 'styled-components';
import { FiEye } from 'react-icons/fi'; 
import { FaPlus } from 'react-icons/fa';  // Ícone "+" do FontAwesome
import Filter from '../components/Filter';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(65,65,65);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const DashboardContent = styled.div`
  padding: 2em;
  margin-top: 120px;
  width: 100%;
  color: white;

  @media (min-width: 768px) {
    width: 75%;
  }

  @media (max-width: 600px) {
    margin-top: 170px;
  }
`;

const Rectangle = styled.div`
  width: 100%;
  padding: 1em;
  margin: 2em 0;
  background-color: rgb(75,75,75);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  color: rgb(253, 185, 19);
  font-size: 1em;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: 0.5s;
  position: relative;

  &:hover {
    border: 1px solid rgb(253, 185, 19);
    cursor: pointer;
    scale: 1.01;
  }

  @media (min-width: 768px) {
    height: 10em;
  }
`;

const RectangleTitle = styled.h2`
  width: 100%;
  margin: 0 0 1em;
  font-size: 2.5em;
`;

const RectangleInfoItem = styled.div`
  flex: 1 1 45%;
  font-size: 1em;
  margin-bottom: 0.5em;

  @media (min-width: 768px) {
    flex: 1 1 22%;
  }
`;

const ViewButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  transition: color 0.25s;
  background-color: rgb(253, 185, 19);
  display: flex;
  align-items: center;
  justify-content: center; 
  height: 100%; 
  padding: 0 1em; 

  &:hover {
    color: rgb(253, 185, 19);
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 1em;
  right: 2em;
  background-color: rgb(253, 185, 19);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  transition: transform 0.2s ease, background-color 0.3s;

  &:hover {
    background-color: rgb(255, 165, 0);
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

const Dashboard = () => {
  const rectangles = [
    {
      title: 'Retângulo 1',
      responsavel: 'João Silva',
      dataCriacao: '01/01/2024',
      cliente: 'Cliente A',
    },
    {
      title: 'Retângulo 2',
      responsavel: 'Maria Oliveira',
      dataCriacao: '02/02/2024',
      cliente: 'Cliente B',
    },
    {
      title: 'Retângulo 3',
      responsavel: 'Carlos Santos',
      dataCriacao: '03/03/2024',
      cliente: 'Cliente C',
    },
    {
      title: 'Retângulo 4',
      responsavel: 'Carlos Santos',
      dataCriacao: '03/03/2024',
      cliente: 'Cliente D',
    },
    {
      title: 'Retângulo 5',
      responsavel: 'Carlos Santos',
      dataCriacao: '03/03/2024',
      cliente: 'Cliente E',
    },
  ];

  return (
    <DashboardContainer>
      <Filter />
      <DashboardContent>
        <h1>LISTA DE 8D</h1>
        {rectangles.map((rectangle, index) => (
          <Rectangle key={index}>
            <RectangleTitle>{rectangle.title}</RectangleTitle>
            <RectangleInfoItem>Responsável: {rectangle.responsavel}</RectangleInfoItem>
            <RectangleInfoItem>Data de criação: {rectangle.dataCriacao}</RectangleInfoItem>
            <RectangleInfoItem>Cliente: {rectangle.cliente}</RectangleInfoItem>
          </Rectangle>
        ))}
      </DashboardContent>

      <FloatingButton>
        <FaPlus />
      </FloatingButton>
    </DashboardContainer>
  );
};

export default Dashboard;
