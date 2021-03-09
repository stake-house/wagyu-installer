import {
  Black,
  DisabledButton,
  Heading,
  MainContent
} from "../colors";

import Footer from "../components/Footer";
import React from "react";
import { shell } from "electron";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height:100vh;
`;

const LandingHeader = styled.div`
  font-weight: 700;
  font-size: 35;
  margin-top: 50;
  color: ${Heading};
  max-width: 550;
  flex-grow:1;
`;


const Content = styled.div`
  color: ${MainContent};
  margin-top: 20;
  width: 650;
  flex-grow: 6;
`;

const StyledLink = styled.span`
  color: ${Heading};
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ImportKeysButton = styled.div`
  color: ${Black};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: fit-content;
  background-color: ${DisabledButton};
  padding: 16 24;
  border-radius: 20px;
  text-decoration: none;

  transition: 250ms background-color ease;
  cursor: pointer;
`;

const sendToLaunchpad = () => {
  shell.openExternal("https://pyrmont.launchpad.ethereum.org/");
}  

const Deposit = () => {
  // TODO: add browse 
  // TODO: run validator then go to status page on Run click
  return (
    <Container>
      <LandingHeader>Deposit</LandingHeader>
      <Content>
        1) Head to the <StyledLink onClick={sendToLaunchpad}>launchpad</StyledLink> to deposit 32 Goerli ETH.
        <br />
        <br />
        <em>Note: Your nodes are set up already, so ignore those steps.</em>
        <br />
        <br />
        <br />
        <br />
        2) After depositing on the launchpad, import validator key here:
        <br />
        <br />
        <br />
        <ButtonContainer>
          <ImportKeysButton>
              Import Validator Keys `keystore-*.json` file
              <br />
              (still in development)
          </ImportKeysButton>
        </ButtonContainer>
        <br />
        <br />
        <br />
        3) Click Run.
      </Content>
      <Footer backLink={"/status"} backLabel={"Back"} nextLink={"/status"} nextLabel={"Run"} />
    </Container>
  )
}

export default Deposit;