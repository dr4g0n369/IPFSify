import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import { Alert, Box, Button, Image, Text } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import DrawerComp from "./components/DrawerComp";
import Header from "./components/Header";
import Main from "./components/Main";
import Search from "./components/Search";

function App() {
  const contentWrapperRef = useRef();
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Box display="flex" height="100vh" width="100%" gap="0rem">
            <DrawerComp />
            <div className="flex-1 overflow-auto" ref={contentWrapperRef}>
              <Header />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </div>
          </Box>
        </div>
      </BrowserRouter>

    </>
  );
}

export default App;
