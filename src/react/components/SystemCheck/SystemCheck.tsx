import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DarkBlue, Gray3 } from '../../colors';
import { isRocketPoolInstalled } from '../../commands/RocketPool';
import { Header } from '../typography/Header';
import { SystemCheckFooter } from './SystemCheckFooter';
import { ResultsTable } from './ResultsTable';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LandingHeader = styled(Header)`
  flex-grow: 1;
`;

const Content = styled.div`
  color: ${Gray3};
  margin-top: 20;
  width: 650;
  flex-grow: 6;
`;

const Advanced = styled.div`
  font-size: 15;
  color: ${DarkBlue};
  max-width: 550;
  cursor: pointer;
`;

enum InstallationStatus {
  Unknown = 'Unknown',
  NotInstalled = 'Not Installed',
  Installed = 'Installed',
}

export const SystemCheck = () => {
  const [shouldShowAdvanced, setShouldShowAdvanced] = useState(false);
  const [
    rocketPoolInstallationStatus,
    setRocketPoolInstallationStatus,
  ] = useState<InstallationStatus>(InstallationStatus.Unknown);
  const [isSystemReady, setIsSystemReady] = useState(false);

  /**
   * This hook performs initial system checks on component mount.
   */
  useEffect(() => {
    /**
     * TODO: Do more validation here:
     * - Check OS
     * - Check hardware (ram/ssd size/speed)
     * - Check for anything that looks like an already running eth1/2 node
     * - Check ports
     */

    setRocketPoolInstallationStatus(
      isRocketPoolInstalled()
        ? InstallationStatus.Installed
        : InstallationStatus.NotInstalled,
    );

    // TODO: add instructions/links for install/fix if a test fails
    // TODO: create a loading state and only render once the test is finished
  }, []);

  useEffect(() => {
    setIsSystemReady(
      rocketPoolInstallationStatus === InstallationStatus.Installed,
    );
  }, [rocketPoolInstallationStatus]);

  return (
    <Container>
      <LandingHeader>System Check</LandingHeader>
      {rocketPoolInstallationStatus === InstallationStatus.Installed ? (
        <Content>
          It looks like you already have Rocket Pool installed. Let's hop over
          to check the status of your node.
        </Content>
      ) : (
        <Content>
          We did some system checks, here are the results:
          <br />
          <br />
          <ResultsTable isRocketPoolInstalled={false} />
          <br />
          <br />
          {isSystemReady && (
            <div>
              We are good to go. We will pick a random eth1 and eth2 client to
              install in order to promote client diversity.
              <br />
              <br />
              <Advanced
                onClick={() => setShouldShowAdvanced(!shouldShowAdvanced)}
              >
                Advanced
              </Advanced>
              {
                // TODO: fix jump when this is clicked, or redesign this altogether
                // TODO: add pivoting dropdown arrow to signify menu opening and closing?

                shouldShowAdvanced ? (
                  <div>
                    <br />
                    <em>
                      This is where we will allow users to pick their client,
                      customize params, etc, however it is not yet implemented.
                    </em>
                    <br />
                    <br />
                    Come join the team and help out :)
                  </div>
                ) : (
                  <div />
                )
              }
            </div>
          )}
          {!isSystemReady &&
            rocketPoolInstallationStatus ===
              InstallationStatus.NotInstalled && (
              <div>
                Unfortunately your system does not meet the requirements so we
                cannot proceed :(
              </div>
            )}
        </Content>
      )}
      <SystemCheckFooter
        isSystemReady={isSystemReady}
        isRocketPoolInstalled={
          rocketPoolInstallationStatus === InstallationStatus.Installed
        }
      />
    </Container>
  );
};
