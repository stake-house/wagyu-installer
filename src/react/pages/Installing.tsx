import {
  Black,
  Button,
  ButtonHover,
  Heading,
  MainContent
} from "../colors";
import { Link, withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { History } from "history";
import { installAndStartRocketPool } from "../commands/RocketPool";

const ENTER_KEYCODE = 13;

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

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${rotate} 2s linear infinite;
`;

const Installing = ({ history }: {history: History}) => {

  useEffect(() => {
    setTimeout(() => {
      installAndStartRocketPool(installCallback);
    }, 1000);
  }, [])

  const installCallback = (success: boolean) => {
    if (success) {
      console.log("install succeeded")
      
      // wait 5 seconds before redirecting to make sure everythings up
      setTimeout(() => {
        history.push('/status');
      }, 5000);
    } else {
      console.log("install failed");
      history.push("/installfailed");
    }
  }

  return (
    <Container>
      <LandingHeader>Install</LandingHeader>
        <Content>
          Installing...
          <br />
          <br />
          May take 2-4 minutes depending on internet speed.
          <SpinnerContainer>
            <LoadingSpinner />
          </SpinnerContainer>
        </Content>
    </Container>
  )
}

export default withRouter(Installing);
