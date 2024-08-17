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
import UploadSong from "./components/UploadSong";
import AudioBar from "./components/MusicPlayer/AudioBar";

function App() {
  const contentWrapperRef = useRef();
  return (
    <>
      <BrowserRouter>
        <div className="App relative">
          <Box display="flex" height="100vh" width="100%" gap="0rem">
            <DrawerComp />
            <div className="flex-1 overflow-auto" ref={contentWrapperRef}>
              <Header />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/search" element={<Search />} />
                <Route path="/upload-song" element={<UploadSong/>} />
                
              </Routes>
            </div>
            <div className="fixed left-0 right-0 bottom-0 bg-blue-900 z-50"><AudioBar/></div>
          </Box>
        </div>
      </BrowserRouter>

    </>
  );
}

export default App;
