import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFilter } from "react-icons/fa";

const FilterContainer = styled.div`
  width: 5em; 
  padding: 1em;
  background-color: rgb(45,45,45); 
  border-right: 1px solid #dee2e6;
  padding-top: 10em; 
  color: white;
  transition: width 0.6s;
  display: flex;
  justify-content: center;
  border:none;

  &:hover {
    width: 20em;
  }

  @media (max-width: 600px) {
    width: 5em;
  }
`;

const FilterContent = styled.div`
  display: ${({ isHover }) => (isHover ? 'block' : 'none')};
  transition: opacity 0.3s;
  align-items: left;
`;

const Filter = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <FilterContainer
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {!isHover && <FaFilter size={24} />}
      <FilterContent isHover={isHover}>
        <div>
            <h3>Filtros</h3>
            <label>
            <input type="checkbox" /> Filtro 1
            </label>
            <br />
            <label>
            <input type="checkbox" /> Filtro 2
            </label>
            <br />
            </div>
      </FilterContent>
    </FilterContainer>
  );
};

export default Filter;
