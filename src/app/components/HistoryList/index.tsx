import React, { FC } from 'react';
import styled from 'styled-components/macro';

interface HistoryListProps {
  history: string[];
}

export const HistoryList: FC<HistoryListProps> = ({ history }) => {
  let rows: JSX.Element[] = [];
  for (let i = 0; i < history.length; i++) {
    rows.push(<Row key={i}>{history[i]}</Row>);
  }

  return (
    <>
      <List>{rows}</List>
    </>
  );
};

const Row = styled.div`
  text-align: right;
  padding-right: 10px;
  color: #fdfdfd;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: solid 1px #414141;
`;

const List = styled.div`
  width: 218px;
  overflow-y: scroll;
  height: 300px;
  float: right;
  display: inline-block;

  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #161616;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #3c3e3e;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #2d2e2e;
  }
`;
