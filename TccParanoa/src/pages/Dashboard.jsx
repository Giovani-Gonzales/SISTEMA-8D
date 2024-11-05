import React from 'react';
import styled from 'styled-components';
import Filter from '../components/Filter'; 

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
`;

const DashboardContent = styled.div`
  width: 75%; 
  padding: 1em;
  padding-top: 7em;
`;
 

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Filter />
      <DashboardContent>
        <h1>Lista de 8D´s</h1>
        <div>TESTE</div>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard;
