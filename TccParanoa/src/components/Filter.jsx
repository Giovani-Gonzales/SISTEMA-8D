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
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;

  &:hover {
    width: 20em;
  }

  @media (max-width: 600px) {
    width: 5em;
  }
`;

const FilterContent = styled.div`
  display: ${({ isHovered }) => (isHovered ? 'block' : 'none')};
  transition: opacity 0.3s;
  align-items: left;
`;

const Filter = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FilterContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{position:"fixed"}}>
        <FilterContent isHovered={isHovered}>
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
        {!isHovered && <FaFilter size={24} />}
      </div>
    </FilterContainer>
  );
};

export default Filter;
