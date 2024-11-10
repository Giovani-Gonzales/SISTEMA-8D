import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 
import Filter from '../components/Filter';
import Form8D from './Form8D';

// Estilos
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #333;

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

const PageNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 1em;
`;

const NavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(253, 185, 19);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(255, 165, 0);
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? 'rgb(253, 185, 19)' : '#666')};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(253, 185, 19);
  }
`;

const ITEMS_PER_PAGE = 20;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/lista8d');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data.length / ITEMS_PER_PAGE)));

  return (
    <DashboardContainer>
      <Filter />
      <DashboardContent>
        <h1>LISTA DE 8D</h1>
        {currentData.length === 0 ? (
          <p style={{height:'70vh', color: 'rgb(253, 185, 19)'}}>Não há dados disponíveis.</p>
        ) : (
          currentData.map((rectangle, index) => (
            <Rectangle key={index}>
              <RectangleTitle>8D ID: {rectangle.id}</RectangleTitle>
              <RectangleInfoItem>Pergunta 1: {rectangle['Pergunta 1']}</RectangleInfoItem>
              <RectangleInfoItem>Pergunta 2: {rectangle['Pergunta 2']}</RectangleInfoItem>
            </Rectangle>
          ))
        )}
        <FloatingButton onClick={handleOpenForm}>
          <FaPlus />
        </FloatingButton>

        <PageNavigation>
          <NavButton onClick={handlePrevPage}>
            <FaArrowLeft />
          </NavButton>
          
          {Array.from({ length: Math.ceil(data.length / ITEMS_PER_PAGE) }, (_, index) => (
            <Dot
              key={index}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            />
          ))}

          <NavButton onClick={handleNextPage}>
            <FaArrowRight />
          </NavButton>
        </PageNavigation>
      </DashboardContent>

      {showForm && <Form8D questions={["Pergunta 1", "Pergunta 2"]} onClose={handleCloseForm} />}
    </DashboardContainer>
  );
};

export default Dashboard;
