import { EthDockerInstaller } from "../EthDockerInstaller";

test("get the right user", async () => {
  const installer = new EthDockerInstaller();
  const user = await installer.getUsername();
  expect(user).toEqual("");
});

describe("preinstall ethdocker", () => {
  function output(res: any) {
    console.log(res);
  }
  const installer = new EthDockerInstaller();

  beforeAll(async () => {
    await installer.preInstall();
  });

  test("pre-install", async () => {
    await installer.preInstall();
  });

  test("user is in docker group", async () => {
    const isInGroup = await installer.isUserInGroup("docker");
    expect(isInGroup).toBeTruthy();
  });

  test("check installed ubuntu package git", async () => {
    const isInstalled = await installer.checkForLinuxBinary("git");
    expect(isInstalled).toBeTruthy();
  });

  test("check installed ubuntu package docker", async () => {
    const isInstalled = await installer.checkForLinuxBinary("docker");
    expect(isInstalled).toBeTruthy();
  });

  test("check installed ubuntu package docker compose", async () => {
    const isInstalled = await installer.checkForLinuxBinary("docker-compose");
    expect(isInstalled).toBeTruthy();
  });

  test("check systemd service details", async () => {
    const service = await installer.getSystemdServiceDetails("docker");

    expect(service.description).toMatch("Docker Application Container Engine");
    expect(service.loadState).toMatch("loaded");
    expect(service.activeState).toMatch("active");
    expect(service.subState).toMatch("running");
    expect(service.unitFileState).toMatch("enabled");
  });
});
