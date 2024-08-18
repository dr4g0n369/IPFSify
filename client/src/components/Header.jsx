import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { Button, Text } from "@chakra-ui/react";
import { useWeb3 } from "../contexts/web3context";
import { useNavigate } from "react-router-dom";

function Header() {
  const { provider, initializeProvider, account } = useWeb3();
  // console.log(provider, account);
  const navigate = useNavigate();
  return (
    <header className="bg-[#070707] flex-1 flex justify-between items-center py-[10px] px-[13px] sm:px-[32px] sticky top-0 z-10">
      <div className="flex">
        <a
          href="#sidebar"
          className="mr-[8px] text-[#969696] p-1 -ml-1.5 inline-block lg:hidden"
        >
          <HamburgerIcon className="h-6 w-6" />
        </a>
        <button
          onClick={() => navigate(-1)} // Go back in history
          className="mr-[8px] text-[#969696] p-1"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => navigate(1)} // Go forward in history
          className="ml-[8px] text-[#969696] p-1"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
      <div>
        {account ? (
          <Text colorScheme="teal" color={"teal"}>
            {account}
          </Text>
        ) : (
          <Button
            colorScheme="teal"
            variant="ghost"
            onClick={initializeProvider}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
