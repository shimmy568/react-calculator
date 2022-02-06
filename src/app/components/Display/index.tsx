import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { OperatorEnum } from 'types/OperatorEnum';
import { formatValue } from 'utils/calculator-utils';

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
        <MainDisplay>{formatValue(storedValue, true)}</MainDisplay>
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
      <MainDisplay>{formatValue(displayValue, true)}</MainDisplay>
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
