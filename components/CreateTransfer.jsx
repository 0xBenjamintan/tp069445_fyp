import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  prepareContractCall,
  sendTransaction,
  createThirdwebClient,
  getContract,
  defineChain,
} from "thirdweb";
import { ethers } from "ethers";
import { useActiveAccount } from "thirdweb/react";
import { ToastContainer, toast } from "react-toastify";

const client = createThirdwebClient({
  clientId: "e4fe35424238e85ff5a4d6b33b04e8f5",
});

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(421614),
  address: "0x4cfb068648e454643863303c0A8fE6dE7304B47A",
});

const CreateTransfer = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const currentActiveWallet = useActiveAccount();

  const handleSendTransaction = async () => {
    try {
      const transaction = await prepareContractCall({
        contract,
        method:
          "function createTransferRequest(address _recipient, uint256 _value) returns (uint256)",
        params: [recipientAddress, ethers.utils.parseEther(transferAmount)],
      });
      toast.info("Transaction Pending", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account: currentActiveWallet, // assuming admin1Wallet is the active account
      });
      console.log("Transaction successful with hash:", transactionHash);
      toast.success(
        `Transaction successful with hash:\nhttps://sepolia.arbiscan.io/tx/${transactionHash}`,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (error) {
      console.error("Error sending transaction:", error);
      toast.error("Error sending transaction", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Send Transaction</h1>
      </div>
      <div className="mb-4">
        <div className="flex flex-col space-y-4">
          <p>Enter Recipient Address:</p>

          <Input
            type="text"
            placeholder="0xf4....hr43"
            className="w-[auto]"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
          <p>Enter Transfer Amount:</p>
          <Input
            type="number"
            placeholder="0.01"
            className="w-full"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
          <Button onClick={handleSendTransaction}>Send Transaction</Button>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default CreateTransfer;
