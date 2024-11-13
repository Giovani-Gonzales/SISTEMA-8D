import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  color: rgb(253, 185, 19);
  width: 5em;
  padding: 1em;
  background-color: rgb(45, 45, 45);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  left: 0;
  transition: 0.5s;

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
    padding: 1em 0;
    margin-top: 120px;
    overflow-y: auto;
    justify-content: center;
    flex-wrap: wrap;

    &:hover {
      width: 100%;
      height: 100%;
    }
  }
`;

const FilterContent = styled.div`
  display: ${({ isHovered }) => (isHovered ? 'block' : 'none')};
  opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
  transition: opacity 0.3s;
  width: 100%;
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

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5em;
  background-color: rgb(65, 65, 65);
  border: 1px solid rgb(253, 185, 19);
  color: rgb(253, 185, 19);
  border-radius: 4px;
  font-size: 1em;

  &:focus {
    outline: none;
    border-color: rgb(253, 185, 19);
  }
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  color: rgb(253, 185, 19);
  margin-bottom: 10px;
`;

const Filter = ({ onFilterChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [responsibleFilter, setResponsibleFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [responsables, setResponsables] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(`Erro ao buscar dados de ${url}:`, error);
      }
    };

    fetchData('http://localhost:3000/clientes', setClientes);
    fetchData('http://localhost:3000/responsavel', setResponsables);
  }, []);

  const handleChange = (setter, field) => (event) => {
    const value = event.target.value;
    setter(value);
    onFilterChange({
      numero8D: field === 'search' ? value : searchText,
      responsavel: field === 'responsavel' ? value : responsibleFilter,
      cliente: field === 'cliente' ? value : clientFilter,
    });
  };

  return (
    <FilterContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FilterContent isHovered={isHovered}>
        <Title>Filtros</Title>
        <StyledInput
          type="text"
          placeholder="Buscar por 8D"
          value={searchText}
          onChange={handleChange(setSearchText, 'search')}
        />
        <SectionDivider />
        
        <FilterLabel>Responsável</FilterLabel>
        <StyledSelect value={responsibleFilter} onChange={handleChange(setResponsibleFilter, 'responsavel')}>
          <option value="">Selecione um responsável</option>
          {responsables.length ? (
            responsables.map((item) => (
              <option key={item.id} value={item.nome}>{item.nome}</option>
            ))
          ) : (
            <option disabled>Sem responsáveis disponíveis</option>
          )}
        </StyledSelect>
        
        <SectionDivider />
        
        <FilterLabel>Cliente</FilterLabel>
        <StyledSelect value={clientFilter} onChange={handleChange(setClientFilter, 'cliente')}>
          <option value="">Selecione um cliente</option>
          {clientes.length ? (
            clientes.map((item) => (
              <option key={item.id} value={item.nome}>{item.nome}</option>
            ))
          ) : (
            <option disabled>Sem clientes disponíveis</option>
          )}
        </StyledSelect>
      </FilterContent>
    </FilterContainer>
  );
};

export default Filter;
