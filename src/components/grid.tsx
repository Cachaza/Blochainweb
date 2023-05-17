import { EtherscanProvider, ethers } from "ethers";
import React from "react";

// Define the contract address and ABI
const contractAddress = "0x649Bf853fD026b9147740b9227A3e1aA7d96b72b"; // replace with your contract address
import ABI from "../abis/Dooze.json";

const walletAddress = "0x3682A5a4386cF692B67546405B012218575603D2"; // replace with your wallet address

const GridNft = async () => {
    const provider = new  EtherscanProvider("sepolia");
    const contract = new ethers.Contract(contractAddress, ABI, provider);




    


    if (!contract){
        return <div>Loading...</div>
    }


  

  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    
                </div>
                <div className="col-sm">

                </div>
            </div>
        </div>
        

    </>
  );
}


export default GridNft;