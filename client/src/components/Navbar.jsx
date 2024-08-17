import { IoHome } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

import NavItem from "./NavItem";
import { Icon } from "@chakra-ui/react";
import { CalendarIcon, PlusSquareIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../contexts/web3context";
import AlertComp from "./AlertComp";
import { useState } from "react";

const activeNavItemClasses =
  "flex items-center text-white bg-[#282828] mx-2 px-4 py-2 rounded";
const navItemClasses =
  "flex items-center hover:text-white mx-2 px-4 py-2 rounded duration-300";

function Navbar() {
  const navigate = useNavigate();
  const { account } = useWeb3(); // Get account from Web3 context
  // const [error, setError] = useState({
  //   status: "",
  //   title: "",
  //   description: "",
  // });
  const handleProtectedNavigation = (path) => {
    if (!account) {
      // setError({
      //   status: "error",
      //   title: "Connect Wallet",
      //   description: "Please connect your wallet to access this feature.",
      // });
      alert("Please connect your wallet to access this feature.");
    } else {
      navigate(path);
    }
  };
  const navItems = [
    {
      label: "Home",
      classes: activeNavItemClasses,
      icon: <Icon as={IoHome} className="h-6 w-6" />,
      action: () => navigate("/"),
    },
    {
      label: "Search",
      classes: navItemClasses,
      icon: <SearchIcon className="h-6 w-6" />,
      action: () => navigate("/search"),
    },
    {
      label: "Your Library",
      classes: `${navItemClasses} mb-6`,
      icon: <CalendarIcon className="h-6 w-6" />,
      action: () => handleProtectedNavigation("/library"),
    },
    {
      label: "Create Playlist",
      classes: navItemClasses,
      icon: <PlusSquareIcon className="h-6 w-6" />,
      action: () => handleProtectedNavigation("/create-playlist"),
    },
    {
      label: "Liked Songs",
      classes: navItemClasses,
      icon: <CiHeart className="h-6 w-6" />,
      action: () => handleProtectedNavigation("/liked-songs"),
    },
    {
      label: "Upload New Song",
      classes: navItemClasses,
      icon: <CiHeart className="h-6 w-6" />,
      action: () => handleProtectedNavigation("/upload-song"),
    },

  ];

  return (
    <nav>
      {navItems.map(({ classes, icon, label, action }) => (
        <NavItem key={label} classes={classes} icon={icon} onClick={action}>
          {label}
        </NavItem>
      ))}
    </nav>
  );
}

export default Navbar;
