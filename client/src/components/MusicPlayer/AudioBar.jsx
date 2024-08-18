import React, { useState, useEffect, act } from 'react';

// import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls.jsx';
import Player from './Player.jsx';
import Track from './Track';
import VolumeBar from './VolumeBar.jsx';
import { useAudio } from '../../contexts/audioPlayer';
import Seekbar from './SeekBar.jsx';
import axios from 'axios';
const AudioBar = () => {
    const { isPlaying, play, pause, changeVolume, setVolume, volume, activeSong, setActiveSong, isActive } = useAudio()
    const [duration, setDuration] = useState(3);
    const [seekTime, setSeekTime] = useState(0);
    const [appTime, setAppTime] = useState(0);
    //   const [volume, setVolume] = useState(0.3);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const getSong = async (CIDhash) => {
        if (activeSong.fetched) return;
        console.log("Getting song from server");
        const response = await axios.get(`http://localhost:3000/getSong/${CIDhash}`, { responseType: 'blob' });

        const fileUrl = URL.createObjectURL(response.data);
        const audio = new Audio(fileUrl.split('blob:')[1])
        audio.onloadedmetadata = () => {
            console.log("Duration", audio.duration);
            setDuration(audio.duration);
        } 
        console.log(audio, fileUrl.toString().split('blob:')[1]);


        setActiveSong({ ...activeSong, uri_name: fileUrl, fetched: true, duration: duration });

    }
    useEffect(() => {
        console.log("Active song changed", activeSong);
        // write a fucntion to get the song from the server at /getSong/:CIDhash
        getSong(activeSong.CIDhash);

    }, [activeSong])
    const handlePlayPause = () => {
        console.log("Play pause");

        if (isPlaying) {
            console.log("pause");
            pause()
        } else {
            console.log("Play ");
            console.log(activeSong);
            play()
        }
    };
    return (
        <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
            <Track activeSong={activeSong} />
            <div className="flex-1 flex flex-col items-center justify-center">
                <Controls
                    isActive={isActive}
                    isPlaying={isPlaying}
                    repeat={repeat}
                    setRepeat={setRepeat}
                    shuffle={shuffle}
                    setShuffle={setShuffle}
                    handlePlayPause={handlePlayPause}
                //   handlePrevSong={handlePrevSong}
                //   handleNextSong={handleNextSong}
                />
                <Seekbar
                    value={appTime}
                    min="0"
                    max={duration}
                    onChange={(event) => {setSeekTime(event.target.value)}}
                    setSeekTime={setSeekTime}
                    appTime={appTime}
                />
                <Player
                    activeSong={activeSong}
                    volume={volume}
                    isPlaying={isPlaying}
                    seekTime={seekTime}
                    repeat={repeat}
                    setDuration={setDuration}
                    isActive={isActive}
                    onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
                //   currentIndex={currentIndex}
                //   onEnded={handleNextSong}
                //   onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
                //   onLoadedData={(event) => setDuration(event.target.duration)}
                />
            </div>
            <VolumeBar value={volume} min="0" max="1" setVolume={setVolume} />
        </div>
    );
};

export default AudioBar;