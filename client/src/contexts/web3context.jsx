import { createContext, useState, useContext } from "react";
import Web3 from "web3";

// Create Web3 Context
const web3Context = createContext({
  provider: null,
  contract: null,
  account: null,
  initializeProvider: () => {},
  initializeContract: () => {},
});

export function UserWeb3ContextProvider({ children }) {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  // Function to initialize provider (connect to MetaMask)
  const initializeProvider = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setProvider(web3);
        setAccount(accounts[0]); // Set the first account

        console.log("Provider initialized", accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Function to initialize contract
  const initializeContract = async (abi, contractAddress) => {
    if (provider) {
      try {
        const contract = new provider.eth.Contract(abi, contractAddress);
        setContract(contract);
        console.log("Contract initialized", contract);
      } catch (error) {
        console.error("Error initializing contract", error);
      }
    } else {
      console.error("Provider is not initialized yet");
    }
  };

  return (
    <web3Context.Provider
      value={{
        provider,
        contract,
        account,
        initializeProvider,
        initializeContract,
      }}
    >
      {children}
    </web3Context.Provider>
  );
}

// Custom Hook for using Web3 context
export function useWeb3() {
  return useContext(web3Context);
}
