import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

type Props = {
  isRocketPoolInstalled: boolean;
};

const ResultsTableStyled = styled.table`
  border: ${rem(2)} solid gray;
  width: 75%;
  padding: ${rem(15)};
  text-align: left;
  color: white;
`;

export const ResultsTable = ({ isRocketPoolInstalled }: Props) => {
  return (
    <ResultsTableStyled>
      <thead>
        <tr>
          <th>Test</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Rocket Pool <i>not</i> installed
          </td>
          <td>{!isRocketPoolInstalled ? 'Pass' : 'Fail'}</td>
        </tr>
      </tbody>
    </ResultsTableStyled>
  );
};
