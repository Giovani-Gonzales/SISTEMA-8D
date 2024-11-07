import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFilter } from "react-icons/fa";
import CustomSelect from './Select';

const FilterContainer = styled.div`
  color: rgb(253, 185, 19);
  width: 5em;
  padding: 1em;
  background-color: rgb(45,45,45);
  padding-top: 10em;
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  left: 0;

  &:hover {
    width: 20em;
    justify-content: flex-start;
  }

  @media (max-width: 600px) {

    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    padding-top: 1em;
    padding-bottom: 2em;
    overflow-y: auto;
    display: flex;
    justify-content: center; 
    flex-wrap: wrap; 
    margin-top: 120px;

    &:hover {
    width:100%;
    height:100%;
    justify-content: center;
  }

`;

const FilterContent = styled.div`
  display: ${({ isHovered }) => (isHovered ? 'block' : 'none')};
  opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
  transition: opacity 0.3s;
  width: 100%; /* Garante que ocupe toda a largura disponível no celular */
`;

const Title = styled.h3`
  margin-bottom: 0.5em;
  color: rgb(253, 185, 19);
`;

const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid rgb(253, 185, 19);
  margin: 1em 0;
`;

const SearchInput = styled.input`
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

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  color: rgb(253, 185, 19);

  input {
    margin-right: 0.5em;
    accent-color: rgb(253, 185, 19);
  }
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  color: rgb(253, 185, 19);
  margin-bottom: 10px;
`;

const Filter = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FilterContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: "fixed" }}>
        <FilterContent isHovered={isHovered}>
          <Title>Filtros</Title>
          <hr />

          <FilterLabel>NOME DA 8D</FilterLabel>
          <SearchInput placeholder="Buscar..." />

          <SectionDivider />

          <FilterLabel>Data</FilterLabel>
          <CheckboxGroup>
            <CheckboxLabel>
              <input type="checkbox" /> Última semana
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" /> Último mês
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" /> Último ano
            </CheckboxLabel>
          </CheckboxGroup>

          <SectionDivider />

          <FilterLabel>Clientes</FilterLabel>
          <CustomSelect 
            options={[
              { value: "scania", label: "Scania" },
              { value: "nome", label: "Nome" },
              { value: "cliente", label: "Cliente" },
              { value: "responsavel", label: "Responsável" }
            ]}
          />

          <SectionDivider />

          <FilterLabel>Ordenar Por</FilterLabel>
          <CustomSelect 
            options={[
              { value: "data", label: "Data" },
              { value: "nome", label: "Nome" },
              { value: "cliente", label: "Cliente" },
              { value: "responsavel", label: "Responsável" }
            ]}
          />
        </FilterContent>
        {!isHovered && <FaFilter size={24} />}
      </div>
    </FilterContainer>
  );
};

export default Filter;
