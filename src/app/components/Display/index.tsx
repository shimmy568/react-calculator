import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { OperatorEnum } from 'types/OperatorEnum';

interface DisplayProps {
  displayValue: string;
  storedValue: string;
  operator: OperatorEnum;
}

export const Display: FC<DisplayProps> = ({
  displayValue,
  storedValue,
  operator,
}) => {
  const formatValue = (value: string) => {
    if (value === '') return '0'; // Empty value should display 0
    let newValue = '';
    let isNeg = false;
    let decimal = '';

    if (value[0] === '-') {
      isNeg = true;
      value = value.substring(1);
    }

    // Extract decimal segment if there is one to add back in later
    if (value.indexOf('.') !== -1) {
      decimal = value.substring(value.indexOf('.'));
      value = value.substring(0, value.indexOf('.'));
    }

    // Add a comma for every three numbers we have going from right to left
    let c = 1;
    for (let i = value.length - 1; i >= 0; i--) {
      newValue = value[i] + newValue;
      if (c % 3 === 0 && c !== value.length) {
        newValue = ',' + newValue;
      }
      c++;
    }

    // Add back in the negative sign
    if (isNeg) {
      newValue = '-' + newValue;
    }

    return newValue + decimal;
  };

  let operatorStr = '';
  switch (operator) {
    case OperatorEnum.Addition:
      operatorStr = ' +';
      break;
    case OperatorEnum.Subtraction:
      operatorStr = ' -';
      break;
    case OperatorEnum.Multiplication:
      operatorStr = ' ×';
      break;
    case OperatorEnum.Division:
      operatorStr = ' ÷';
  }

  if (
    displayValue === '' &&
    storedValue !== '' &&
    operator === OperatorEnum.None
  ) {
    return (
      <>
        <StoredDisplay></StoredDisplay>
        <MainDisplay>{formatValue(storedValue)}</MainDisplay>
      </>
    );
  }

  return (
    <>
      {}
      <StoredDisplay>
        {storedValue && formatValue(storedValue)}
        {operatorStr}
      </StoredDisplay>
      <MainDisplay>{formatValue(displayValue)}</MainDisplay>
    </>
  );
};

const MainDisplay = styled.div`
  text-align: right;
  padding-right: 15px;
  margin-top: 0px;
  padding-bottom: 20px;
  color: #fdfdfd;
  font-size: 25px;
  border-bottom: solid 1px #414141;
`;

const StoredDisplay = styled.div`
  color: #bdbdbd;
  text-align: right;
  margin-right: 20px;
  margin-top: 10px;
  font-size: 14px;
  height: 20px;
`;
