import { useNavigate } from "react-router-dom";
import React, { FC, ReactElement, useState, Dispatch, SetStateAction } from "react";
import styled from '@emotion/styled';
import { Container, Grid, Modal, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { HomeIcon } from "../components/icons/HomeIcon";
import { NetworkPicker } from "../components/NetworkPicker";
import { StepSequenceKey } from '../types'
import VersionFooter from "../components/VersionFooter";
import { InstallDetails } from "../../electron/IMultiClientInstaller";

const StyledMuiContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NetworkDiv = styled.div`
  margin-top: 35px;
  margin-left: 35px;
  align-self: flex-start;
  color: gray;
`;

const LandingHeader = styled(Typography)`
  font-size: 36px;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const SubHeader = styled(Typography)`
  margin-top: 20px;
`;

const Links = styled.div`
  margin-top: 20px;
`;

const StyledLink = styled(Typography)`
  cursor: pointer;
  display: inline;
`;

const InfoLabel = styled.span`
  color: gray;
`;

const EnterGrid = styled(Grid)`
  margin-top: 35px;
  align-items: center;
`;

const ContentGrid = styled(Grid)`
  height: 320px;
  margin-top: 16px;
`;

type HomeProps = {
  installationDetails: InstallDetails,
  setInstallationDetails: Dispatch<SetStateAction<InstallDetails>>
}

/**
 * Home page and entry point of the app.  This page displays general information
 * and options for a user to create a new secret recovery phrase or use an 
 * existing one.
 * 
 * @param props passed in data for the component to use
 * @returns the react element to render
 */
const Home: FC<HomeProps> = (props): ReactElement => {
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [networkModalWasOpened, setNetworkModalWasOpened] = useState(false);
  const [enterSelected, setEnterSelected] = useState(false);

  const navigate = useNavigate();

  const handleOpenNetworkModal = () => {
    setShowNetworkModal(true);
    setNetworkModalWasOpened(true);
  }

  const handleCloseNetworkModal = (event: object, reason: string) => {
    if (reason !== 'backdropClick') {
      setShowNetworkModal(false);

      if (enterSelected) {
        handleEnter();
      }
    }
  }

  const sendToGithub = () => {
    window.electronAPI.shellOpenExternal("https://github.com/stake-house/wagyu-installer");
  }

  const sendToDiscord = () => {
    window.electronAPI.shellOpenExternal("https://discord.io/ethstaker");
  }

  const handleEnter = () => {

    // Backend usage example
    // const consoleWrite: OutputLogs = (message: string): void => {
    //   console.log(message);
    // };

    // window.ethDocker.preInstall(consoleWrite).then(preInstallResult => {
    //   console.log(`preInstall ${preInstallResult}`);
      /*if (preInstallResult) {
        const installationDetails: InstallDetails = {
          network: props.network,
          executionClient: ExecutionClient.GETH,
          consensusClient: ConsensusClient.LIGHTHOUSE
        };

        window.ethDocker.install(installationDetails).then(installResult => {
          console.log(`install ${installResult}`);
          if (installResult) {
            window.ethDocker.importKeys(
              props.network,
              '/home/remy/keys',
              'password').then(importKeysResult => {
                console.log(`importKeys ${importKeysResult}`);

                if (importKeysResult) {
                  window.ethDocker.postInstall(props.network).then(postInstallResult => {
                    console.log(`postInstall ${postInstallResult}`);
                  });
                }

              });
          }

        });
      }*/
    // });

    setEnterSelected(true);

    if (!networkModalWasOpened) {
      handleOpenNetworkModal();
    } else {
      const location = {
        pathname: `/wizard/${StepSequenceKey.Install}`
      }

      navigate(location);
    }
  }

  const tabIndex = (priority: number) => showNetworkModal ? -1 : priority;

  return (
    <StyledMuiContainer>
      <NetworkDiv>
        Select Network: <Button color="primary" onClick={handleOpenNetworkModal} tabIndex={tabIndex(1)}>{props.installationDetails.network}</Button>
      </NetworkDiv>
      <Modal
        open={showNetworkModal}
        onClose={handleCloseNetworkModal}
      >
        {/* Added <div> here per the following link to fix error https://stackoverflow.com/a/63521049/5949270 */}
        <div>
          <NetworkPicker handleCloseNetworkModal={handleCloseNetworkModal} setInstallationDetails={props.setInstallationDetails} installationDetails={props.installationDetails}></NetworkPicker>
        </div>
      </Modal>

      <LandingHeader variant="h1">Welcome!</LandingHeader>
      <HomeIcon />
      <SubHeader>Your installer for staking on Ethereum</SubHeader>

      <Links>
        <StyledLink display="inline" color="primary" onClick={sendToGithub} tabIndex={tabIndex(0)}>Github</StyledLink>
        &nbsp;|&nbsp;
        <StyledLink display="inline" color="primary" onClick={sendToDiscord} tabIndex={tabIndex(0)}>Discord</StyledLink>
      </Links>

      <EnterGrid>
        <Button variant="contained" color="primary" onClick={handleEnter} tabIndex={tabIndex(1)}>
          Enter
        </Button>
      </EnterGrid>
      <VersionFooter />
    </StyledMuiContainer>
  );
};

export default Home;
