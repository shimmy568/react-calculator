import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { OperatorEnum } from 'types/OperatorEnum';
import { formatValue } from 'utils/calculator-utils';
import { CalculatorButton } from '../CalculatorButton';
import { Display } from '../Display';
import { HistoryList } from '../HistoryList';

export function Calculator() {
  const [displayValue, setDisplayValue] = useState('');
  const [storedValue, setStoredValue] = useState('');
  const [operator, setOperator] = useState<OperatorEnum>(OperatorEnum.None);
  const [history, setHistory] = useState<string[]>([]);

  const decimalAccuracy = 6;

  const formatHistory = (
    v1: number,
    v2: number,
    ans: number,
    operator: string,
  ): string => {
    let s1 = v1.toFixed(decimalAccuracy).toString();
    let s2 = v2.toFixed(decimalAccuracy).toString();
    let sAns = formatValue(ans.toFixed(decimalAccuracy).toString());
    return `${formatValue(s1)} ${operator} ${formatValue(s2)} = ${sAns}`;
  };

  const doCalculation = (
    v1: number,
    v2: number,
    operator: OperatorEnum,
  ): string => {
    let ans: number;
    switch (operator) {
      case OperatorEnum.Addition:
        ans = v1 + v2;
        setHistory([formatHistory(v1, v2, ans, '+'), ...history]);
        return formatValue(ans.toFixed(decimalAccuracy).toString());
      case OperatorEnum.Subtraction:
        ans = v1 - v2;
        setHistory([formatHistory(v1, v2, ans, '-'), ...history]);
        return formatValue(ans.toFixed(decimalAccuracy).toString());
      case OperatorEnum.Multiplication:
        ans = v1 * v2;
        setHistory([formatHistory(v1, v2, ans, '×'), ...history]);
        return formatValue(ans.toFixed(decimalAccuracy).toString());
      case OperatorEnum.Division:
        ans = v1 / v2;
        setHistory([formatHistory(v1, v2, ans, '÷'), ...history]);
        return formatValue(ans.toFixed(decimalAccuracy).toString());
    }
    console.error('Unknown operator');
    return '';
  };

  const processValue = () => {
    if (storedValue === '' || operator === OperatorEnum.None) {
      // No calculations to be done, just copy value to store and clear display
      if (displayValue !== '') {
        setStoredValue(displayValue);
      }
      setDisplayValue('');
    } else {
      // Do the maths
      let result = doCalculation(
        parseFloat(storedValue),
        parseFloat(displayValue),
        operator,
      );

      setDisplayValue('');
      setStoredValue(result);
    }
  };

  const onDecimalClick = () => {
    if (displayValue && displayValue.charAt(displayValue.length - 1) !== '.') {
      onNumberClick('.');
    }
  };

  const onNumberClick = (v: string) => {
    setDisplayValue(displayValue + v);
  };

  const onOperatorButtonClick = (value: OperatorEnum) => {
    if (operator === OperatorEnum.None) {
      if (displayValue === '' && storedValue === '') {
        if (value === OperatorEnum.Subtraction) {
          setDisplayValue('-');
        }
      } else if (displayValue === '-') {
        setDisplayValue('');
      } else {
        setOperator(value);
        processValue();
      }
    }
  };

  const clearDisplay = () => {
    setOperator(OperatorEnum.None);
    if (displayValue === '') {
      setStoredValue('');
    } else {
      setDisplayValue('');
    }
  };

  const equalFunction = () => {
    setOperator(OperatorEnum.None);
    processValue();
  };

  const backspaceFunction = () => {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1));
  };

  let buttons: JSX.Element[] = [];
  for (let i = 1; i <= 9; i++) {
    let s = i.toString();
    buttons.push(
      <CalculatorButton displayValue={s} onClick={() => onNumberClick(s)} />,
    );
  }

  return (
    <>
      <Wrapper>
        <Display
          displayValue={displayValue}
          storedValue={storedValue}
          operator={operator}
        />
        <ButtonContainer>
          <div>
            <CalculatorButton
              displayValue="C"
              onClick={clearDisplay}
              doubleWidth={true}
            />
            <CalculatorButton displayValue="←" onClick={backspaceFunction} />
            <CalculatorButton
              displayValue="÷"
              onClick={() => onOperatorButtonClick(OperatorEnum.Division)}
              primary={true}
            />
          </div>
          <div>
            <CalculatorButton
              displayValue={'7'}
              onClick={() => onNumberClick('7')}
            />
            <CalculatorButton
              displayValue={'8'}
              onClick={() => onNumberClick('8')}
            />
            <CalculatorButton
              displayValue={'9'}
              onClick={() => onNumberClick('9')}
            />
            <CalculatorButton
              displayValue={'×'}
              primary={true}
              onClick={() => onOperatorButtonClick(OperatorEnum.Multiplication)}
            />
          </div>
          <div>
            <CalculatorButton
              displayValue={'4'}
              onClick={() => onNumberClick('4')}
            />
            <CalculatorButton
              displayValue={'5'}
              onClick={() => onNumberClick('5')}
            />
            <CalculatorButton
              displayValue={'6'}
              onClick={() => onNumberClick('6')}
            />
            <CalculatorButton
              displayValue={'-'}
              primary={true}
              onClick={() => onOperatorButtonClick(OperatorEnum.Subtraction)}
            />
          </div>
          <div>
            <CalculatorButton
              displayValue={'1'}
              onClick={() => onNumberClick('1')}
            />
            <CalculatorButton
              displayValue={'2'}
              onClick={() => onNumberClick('2')}
            />
            <CalculatorButton
              displayValue={'3'}
              onClick={() => onNumberClick('3')}
            />
            <CalculatorButton
              displayValue={'+'}
              primary={true}
              onClick={() => onOperatorButtonClick(OperatorEnum.Addition)}
            />
          </div>
          <div>
            <CalculatorButton
              displayValue={'0'}
              doubleWidth={true}
              onClick={() => onNumberClick('0')}
            />
            <CalculatorButton
              displayValue={'.'}
              onClick={onDecimalClick} // make sure user doesn't add . when there's nothing
            />
            <CalculatorButton
              displayValue={'='}
              primary={true}
              onClick={equalFunction}
            />
          </div>
        </ButtonContainer>
        <HistoryList history={history} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  border: solid;
  border-width: 1px;
  background: #111;
  border-color: #414141;
  margin: 15px;
  width: 400px;
`;

const ButtonContainer = styled.div`
  display: inline-block;
`;
