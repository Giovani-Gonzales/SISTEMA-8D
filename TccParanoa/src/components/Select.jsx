import React from 'react';
import styled from 'styled-components';

const SelectInput = styled.select`
  width: 100%;
  padding: 0.5em;
  background-color: rgb(65, 65, 65);
  border: 1px solid rgb(253, 185, 19);
  color: rgb(253, 185, 19);
  font-size: 1em;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: rgb(253, 185, 19);
  }
`;

const Select = ({ options = [], onChange, value, ...props }) => {
  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedOption = options.find((option) => option.id === selectedId);
    if (onChange) {
      onChange(selectedOption);
    }
  };

  return (
    <SelectInput onChange={handleSelectChange} value={value?.id || ""} {...props}>
      <option value="">Selecione uma opção</option>
      {options.length > 0 ? (
        options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nome}
          </option>
        ))
      ) : (
        <option disabled>Sem opções disponíveis</option>
      )}
    </SelectInput>
  );
};

export default Select;
