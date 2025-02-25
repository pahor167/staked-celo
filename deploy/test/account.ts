import { DeployFunction } from "@celo/staked-celo-hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const manager = await hre.deployments.get("Manager");
  const { deployer, owner } = await hre.getNamedAccounts();
  await deploy("Account", {
    from: deployer,
    log: true,
    proxy: {
      proxyArgs: ["{implementation}", "{data}"],
      owner: owner,
      upgradeIndex: 0,
      proxyContract: "ERC1967Proxy",
      execute: {
        methodName: "initialize",
        args: [hre.ethers.constants.AddressZero, manager.address, owner],
      },
    },
  });
};

func.id = "deploy_test_account";
func.tags = ["TestAccount"];
func.dependencies = ["TestManager"];
export default func;
