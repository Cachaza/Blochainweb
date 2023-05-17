import { Contract, EtherscanProvider, Provider, ethers } from "ethers";
import { useMemo } from "react";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";
import ABI from "../abis/Dooze.json";

const address = "0x649Bf853fD026b9147740b9227A3e1aA7d96b72b";


const useDoozeContract = () => {
  const provider = new  EtherscanProvider("sepolia");
  const { state } = useWeb3Context() as IWeb3Context;

  return useMemo(
    () => state.signer && new Contract(address, ABI, state.signer),
    [state.signer]
  );
};

export default useDoozeContract;
