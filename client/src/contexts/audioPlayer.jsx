// AudioContext.js
import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [activeSong, setActiveSong] = useState({
        uri_name: "",
        title: "",
        CIDhash: "",
        Likes: 0,
        fetched: false,
        duration: 0
    })
    const [isActive, setIsActive] = useState(false);
    const audioRef = useRef(null);
    const play = () => {
        setIsPlaying(true);
    };

    const pause = () => {

        setIsPlaying(false);

    };

    const changeVolume = (newVolume) => {
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
            setVolume(newVolume);
        }
    };

    return (
        <AudioContext.Provider value={{ isPlaying, play, pause, volume, setVolume, audioRef, activeSong, setActiveSong, isActive, setIsActive }}>
            {children}
            {/* Hidden audio element */}
        </AudioContext.Provider>
    );
};

export const useAudio = () => useContext(AudioContext);
