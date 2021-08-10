import React from 'react';
import styled from 'styled-components';
import { Heading, MainContent } from '../colors';
import Footer from './Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LandingHeader = styled.div`
  font-weight: 700;
  font-size: 35;
  margin-top: 50;
  color: ${Heading};
  max-width: 550;
  flex-grow: 1;
`;

const Content = styled.div`
  color: ${MainContent};
  margin-top: 20;
  width: 650;
  flex-grow: 6;
`;

export const InstallFailed = () => {
  return (
    <Container>
      <LandingHeader>Install Failed</LandingHeader>
      <Content>
        Unfortunately your install failed. At this time we cannot provide any
        additonal info.
        <br />
        <br />
        <br />
        Please reach out to the ethstaker community for help.
      </Content>
      <Footer backLink={'/'} backLabel={'Home'} nextLink={''} nextLabel={''} />
    </Container>
  );
};
