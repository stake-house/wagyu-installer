import {
  DarkBlue,
  Heading,
  MainContent
} from "../colors";
import React, { useEffect, useState } from "react";
import { isRocketPoolInstalled, queryEth1Status } from "../commands/RocketPool";

import Footer from "../components/Footer";
import styled from "styled-components";
import { which } from "../commands/ExecuteCommand";

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

const Advanced = styled.div`
  font-size:15;
  color: ${DarkBlue};
  max-width: 550;
  cursor: pointer;
`;

const ResultsTable = styled.table`
  border: 2px solid gray;
  width: 75%;
  padding: 15px;
  text-align: left;
  color: white;
`;

const SystemCheck = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [arbitraryTest, setArbitraryTest] = useState(false);
  const [curlInstalled, setCurlInstalled] = useState(false);
  const [rocketPoolInstalled, setRocketPoolInstalled] = useState(false);
  const [systemStatus, setSystemStatus] = useState(false);

  const [eth1Status, setEth1Status] = useState(2);

  useEffect(() => {
    runSystemCheck();
  }, [])

  useEffect(() => {
    setSystemStatus(
      arbitraryTest &&
      curlInstalled &&
      !rocketPoolInstalled
    );
  }, [arbitraryTest, curlInstalled, rocketPoolInstalled]);
  
  const runSystemCheck = () => {
    // TODO: do more validation here
    // TODO: check OS
    // TODO: check hardware (ram/ssd size/speed)
    // TODO: check for anything that looks like an already running eth1/2 node
    // TODO: check ports
    setRocketPoolInstalled(isRocketPoolInstalled());
    setCurlInstalled(which("curl"));
    setArbitraryTest(true);

    // TODO: add instructions/links for install/fix if a test fails
    // TODO: create a loading state and only render once the test is finished
  }

  const resultToIcon = (result: boolean): string => {
    // TODO: make these icons - green check and red X
    return result ? "Pass" : "Fail";
  }

  const toggleShowAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  }

  const renderRocketPoolInstalledContent = () => {
    return (
      <Content>
        It looks like you already have Rocket Pool installed.  Let's hop over to check the status of your node.
      </Content>
    );
  }

  const renderSystemCheckResultsTable = () => {
    // TODO: make this dynamic
    return (
      <ResultsTable>
        <thead>
          <tr>
            <th>Test</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>curl installed</td>
            <td>{resultToIcon(curlInstalled)}</td>
          </tr>
          <tr>
            <td>Rocket Pool <i>not</i> installed</td>
            <td>{resultToIcon(!rocketPoolInstalled)}</td>
          </tr>
          {/* This test is used for development purposes, so we can toggle different states easily */}
          {/* <tr>
            <td>Arbitrary test</td>
            <td>{resultToIcon(arbitraryTest)}</td>
          </tr> */}
        </tbody>
      </ResultsTable>
    )
  }

  const renderSystemReady = () => {
    return (
      <div>
        We are good to go.  We will pick a random eth1 and eth2 client to install in order to promote client diversity.
        <br/>
        <br/>
        <Advanced onClick={toggleShowAdvanced}>Advanced</Advanced>
        { // TODO: fix jump when this is clicked, or redisgn this alltogether
          // TODO: add pivoting dropdown arrow to signify menu opening and closing?
          showAdvanced ?
          <div>
            <br />
            <em>This is where we will allow users to pick their client, customize params, etc, however it is not yet implemented.</em>
            <br /><br />
            Come join the team and help out :)
          </div>
            :
          <div></div>
        }
      </div>
    );
  }

  const renderCantProceed = () => {
    return (
      <div>
        Unfortunately your system does not meet the requirements so we cannot proceed :(
      </div>
    )
  }

  const renderSystemCheckContent = () => {
    return (
      <Content>
        We did some system checks, here are the results:
        <br />
        <br />
        { renderSystemCheckResultsTable() }
        <br />
        <br />
        { systemStatus ? renderSystemReady() : renderCantProceed() }
      </Content>
    );
  }

  const renderContent = () => {
    if (rocketPoolInstalled) {
      return renderRocketPoolInstalledContent();
    } else {
      return renderSystemCheckContent();
    }
  }

  const renderFooter = () => {
    if (systemStatus) {
      return (
        <Footer backLink={"/"} backLabel={"Back"} nextLink={"/installing"} nextLabel={"Install"} />
      )
    } else if (rocketPoolInstalled) {
      return (
        <Footer backLink={"/"} backLabel={"Back"} nextLink={"/status"} nextLabel={"Status"} />
      )
    } else {
      return (
        <Footer backLink={"/"} backLabel={"Back"} nextLink={""} nextLabel={""} />
      )
    }
  }

  return (
    <Container>
      <LandingHeader>System Check</LandingHeader>
      {renderContent()}
      {renderFooter()}
    </Container>
  )
}

export default SystemCheck;