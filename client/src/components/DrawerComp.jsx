import { Button, Text } from "@chakra-ui/react";
import Navbar from "./Navbar";

function DrawerComp({ showPopover }) {
  return (
    <aside
      id="sidebar"
      className="bg-black w-[256px] text-[#b2b2b2] overflow-hidden flex flex-col fixed lg:sticky top-0 z-30 h-screen lg:h-auto -translate-x-full target:translate-x-0 lg:translate-x-0 transition-transform peer"
    >
      <Text className="text-white text-2xl font-bold p-4">IPFSify</Text>
      <Navbar />
    
    </aside>
  );
}

export default DrawerComp;
