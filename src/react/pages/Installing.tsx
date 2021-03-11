import {
  Black,
  Button,
  ButtonHover,
  Heading,
  MainContent
} from "../colors";
import { Link, withRouter } from "react-router-dom";
import React, { useState } from "react";
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

const StyledInput = styled.input`
  width: 100px;
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

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: flex-end;
  height: 70;
  flex-grow:1;
  min-width:100vw;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ContinueButton = styled.div`
  color: ${Black};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self:flex-end;
  height: 24;
  background-color: ${Button};
  padding: 16 24;
  border-radius: 10%;
  text-decoration: none;

  transition: 250ms background-color ease;
  cursor: pointer;
  margin: 60;

  &:hover {
    background-color: ${ButtonHover};
  }
`;

const StyledButton = styled(Link)`
  color: ${Black};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self:flex-end;
  height: 24;
  background-color: ${Button};
  padding: 16 24;
  border-radius: 10%;
  text-decoration: none;

  transition: 250ms background-color ease;
  cursor: pointer;
  margin: 60;

  &:hover {
    background-color: ${ButtonHover};
  }
`;

const Installing = ({ history }: {history: History}) => {
  const [password, setPassword] = useState("");
  const [installInProgress, setInstallInProgress] = useState(false);

  const handleChangePassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  }

  const handleKeyPressed = (event: { keyCode: any; which: any; }) => {
    var code = event.keyCode || event.which;
    if(code === ENTER_KEYCODE) {
        handleSubmitPassword();
    } 
  }

  const handleSubmitPassword = () => {
    // TODO: handle wrong password
    // TODO: handle empty password

    setInstallInProgress(true);

    // Without this setTimeout, there was a pause before the screen would update saying Installing...
    setTimeout(() => {
      installAndStartRocketPool(password, installCallback);
    }, 2000);
  }

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

      { installInProgress ?
        <Content>
          Installing...
          <br />
          <br />
          May take up to 2 minutes.
          <SpinnerContainer>
            <LoadingSpinner />
          </SpinnerContainer>
        </Content> :
        <Content>
          In order to download the necessary software, we must have admin access to your computer.
          <br />
          <br />
          Please enter you computer login password* below.  Don't worry, we'll keep it safe.
          <br />
          <br />
          <InputContainer>
            <StyledInput type="password" value={password} onChange={handleChangePassword} onKeyPress={handleKeyPressed} />
          </InputContainer>
          <br />
          <br />
          *Note: at this stage we cannot handle password retries, so please get it right ;)
        </Content>
      }
      <FooterContainer>
        <StyledButton to="/systemcheck">Back</StyledButton>
        <ContinueButton onClick={handleSubmitPassword}>Continue</ContinueButton>
      </FooterContainer>
    </Container>
  )
}

export default withRouter(Installing);
