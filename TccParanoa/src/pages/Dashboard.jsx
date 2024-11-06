import React from 'react';
import styled from 'styled-components';
import Filter from '../components/Filter';

const DashboardContainer = styled.div`
  display: flex;
  background-color: rgb(65,65,65);
`;

const DashboardContent = styled.div`
  padding: 3em;
  margin-top: 120px; 
  width: 75%; 
  color: white;
`;

const Rectangle = styled.div`
  width: 100%;
  height: 10em;
  margin: 1em 0;
  background-color: rgb(75,75,75);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2em;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: border 0.25s;

  &:hover {
    border: 1px solid rgb(253, 185, 19);
  }
`;

const Dashboard = () => {
  const rectangles = Array.from({ length: 3 }, (_, index) => `Retângulo ${index + 1}`);

  return (
    <DashboardContainer>
      <Filter />
      <DashboardContent>
        <h1>LISTA DE 8D</h1>
        {rectangles.map((rectangle, index) => (
          <Rectangle key={index}>{rectangle}</Rectangle>
        ))}
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard;
