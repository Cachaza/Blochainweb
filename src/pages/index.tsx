import { useMemo } from "react";

import Head from "next/head";
import {
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";
import { FaEthereum } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { EtherscanProvider, ethers } from "ethers";


import ABI from "../abis/Dooze.json";
import Link from "next/link";

const BSCTChainID = 11155111;

export default function Home() {
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain },
  } = useWeb3Context() as IWeb3Context;


  



  const correctNetwork = useMemo(() => {
    return currentChain === BSCTChainID;
  }, [currentChain]);

  

  //get wallet balance
  const getBalance = async () => {
    if (address){
    const provider = new  EtherscanProvider("sepolia");
    const balance = provider.getBalance(address);
    const contracct = await provider.getContract(address);

    console.log(balance);
    console.log(contracct);
      

    return balance;
    } else {
      return "0";
    }

  };

  getBalance();


  

  return (
    <div className="bg-gray-800">
      <Head>
        <title>Next + Ethers dApp</title>
      </Head>
      <HStack
        width="full"
        as="header"
        height="80px"
        px={4}
        alignItems="center"
        bg="gray.900"
      >
        <HStack as="nav" width="full" justifyContent="space-between">
          <HStack>
            {!isAuthenticated ? (
              <Button
                onClick={connectWallet}
                variant="solid"
                bg="blue.400"
                colorScheme="blue"
                gap={2}
                color="white"
              >
                <Icon as={FaEthereum} />
                Connect wallet
              </Button>
            ) : (
              <Button
                onClick={disconnect}
                variant="solid"
                bg="red.400"
                colorScheme="red"
                color="white"
                gap={2}
              >
                <Icon as={BiLogOut} />
                Disconnect
              </Button>
            )}
          </HStack>
        </HStack>
      </HStack>
      {isAuthenticated &&
        (correctNetwork ? (
          <div className="container mx-auto -mt-20 flex min-h-screen flex-col items-center justify-center p-4">
            <div className="text-3xl text-white">Bienvenido</div>
            <div className="pb-5 text-2xl text-white">Direccion de cartera: {address}</div>

            <div className="flex flex-col p-4">
              <div className="p-2">
                <Link href={"https://sepolia.etherscan.io/token/0x36A5201f37A1735d8E8d17F6c8A2d5F7666416ec?a=" + address} className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" target="_blank">
                  Ver NFTs
                </Link>
              </div>
              <div className="p-2">
                <Link href={"https://sepolia.etherscan.io/address/0x36a5201f37a1735d8e8d17f6c8a2d5f7666416ec#writeContract"} className=" rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" target="_blank">
                  Transferir NFTs
                </Link>
              </div>
            </div>


            

            

          </div>
        ) : (
          <div className="container mx-auto -mt-20 flex min-h-screen flex-col items-center justify-center p-4">
            <div className="text-4xl text-white">Error</div>
            <div className="pb-5 text-xl text-white">
              
              <div className="text-2xl">La cartera no se encuentra en la red adecuada</div>
            </div>
          </div>
        ))}
    </div>
  );
}
