import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  font-family: 'PT Mono', monospace;
`;

export const withGlobalStyles = (storyFn: any) => {
  return (
    <>
      <Container>{storyFn()}</Container>
    </>
  );
};
