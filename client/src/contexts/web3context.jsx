import { createContext, useState, useContext, useEffect, useRef } from "react";
import Web3 from "web3";
import abi from "../abi.json";

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
  const contractInitialized = useRef(false); // Track contract initialization

  // Function to initialize provider (connect to MetaMask)
  const initializeProvider = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setProvider(web3);
        setAccount(accounts[0]); // Set the first account
        // console.log("Provider initialized with account:", accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Function to initialize contract
  const initializeContract = async (abi, contractAddress) => {
    if (provider && !contractInitialized.current) {
      try {
        const contract = new provider.eth.Contract(abi, contractAddress);
        setContract(contract);
        contractInitialized.current = true; // Set flag to true after initializing
        // console.log("Contract initialized at address:", contractAddress);
      } catch (error) {
        console.error("Error initializing contract", error);
      }
    }
  };

  useEffect(() => {
    if (provider) {
      const contractAddress = '0xfa567dff7A2625B34052ac08D18bfe76C79DFeb5';
      initializeContract(abi, contractAddress);
    }
  }, [provider]);

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

export function useWeb3() {
  return useContext(web3Context);
}
