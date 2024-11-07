import React from 'react';
import styled from 'styled-components';

const SelectInput = styled.select`
  width: 100%;
  padding: 0.5em;
  background-color: rgb(65,65,65);
  border: 1px solid rgb(253, 185, 19);
  color: rgb(253, 185, 19);
  font-size: 1em;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: rgb(253, 185, 19);
  }
`;

const Select = ({ options, ...props }) => (
  <SelectInput {...props}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </SelectInput>
);

export default Select;
