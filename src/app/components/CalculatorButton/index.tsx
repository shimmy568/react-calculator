import * as React from 'react';
import { FC } from 'react';
import styled from 'styled-components';

interface CalculatorButtonProps {
  displayValue: string;
  doubleWidth?: boolean;
  primary?: boolean;
  onClick: () => void;
}

export const CalculatorButton: FC<CalculatorButtonProps> = ({
  displayValue,
  onClick,
  doubleWidth = false,
  primary = false,
}) => {
  let bgColor = '#2b2b2b';
  let hoverColor = '#484848';

  if (primary) {
    bgColor = '#dc8c00';
    hoverColor = '#a16907';
  }

  return (
    <>
      <Button
        bgColor={bgColor}
        hoverColor={hoverColor}
        doubleWidth={doubleWidth}
        onClick={onClick}
      >
        {displayValue}
      </Button>
    </>
  );
};

const Button = styled.button<{
  doubleWidth: boolean;
  bgColor: string;
  hoverColor: string;
}>`
  background: ${p => p.bgColor};
  border: solid;
  border-width: 1px;
  height: 60px;
  width: ${p => (p.doubleWidth ? 45 * 2 : 45)}px;
  color: #fdfdfd;
  border-color: #414141;
  font-size: 25px;
  &:hover {
    background: ${p => p.hoverColor};
  }
`;
