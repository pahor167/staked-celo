import { DeployFunction } from "@celo/staked-celo-hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { catchNotOwnerForProxy } from "../lib/deploy-utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  const isManagerAlreadyDeployed = await hre.deployments.getOrNull("Manager");

  await catchNotOwnerForProxy(
    deploy("Manager", {
      from: deployer,
      log: true,
      proxy: {
        proxyArgs: ["{implementation}", "{data}"],
        proxyContract: "ERC1967Proxy",
        execute: {
          init: {
            methodName: "initialize",
            args: [hre.ethers.constants.AddressZero, deployer],
          },
        },
      },
    })
  );

  if (isManagerAlreadyDeployed) {
    console.log("Manager proxy was already deployed - skipping group activation");
    return;
  }
};

func.id = "deploy_manager";
func.tags = ["Manager", "core", "proxy"];
func.dependencies = ["MultiSig"];
export default func;
