import React from 'react';
import styled from 'styled-components';
import { Slate1 } from '../../src/react/colors';

const Container = styled.main`
  font-family: 'PT Mono', monospace;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${Slate1};
`;

export const withGlobalStyles = (storyFn: any) => {
  return (
    <>
      <Container>{storyFn()}</Container>
    </>
  );
};
