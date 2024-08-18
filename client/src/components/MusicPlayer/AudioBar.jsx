import React, { useState, useEffect } from 'react';

// import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls.jsx';
import Player from './Player.jsx';
import Track from './Track';
import VolumeBar from './VolumeBar.jsx';
import { useAudio } from '../../contexts/audioPlayer';
import Seekbar from './SeekBar.jsx';
const AudioBar = () => {
    const { isPlaying, play, pause, changeVolume, setVolume, volume, activeSong, setActiveSong, isActive } = useAudio()
    const [duration, setDuration] = useState(3);
    const [seekTime, setSeekTime] = useState(0);
    const [appTime, setAppTime] = useState(0);
    //   const [volume, setVolume] = useState(0.3);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    // useEffect(() => {
    //     setActiveSong({ uri_name: "/src/assets/audioFiles/sample-6s.mp3", title: "sample-6s" })
    // }, [])
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
                    onInput={(event) => setSeekTime(event.target.value)}
                    setSeekTime={setSeekTime}
                    appTime={appTime}
                />
                <Player
                    activeSong={activeSong}
                    volume={volume}
                    isPlaying={isPlaying}
                    seekTime={seekTime}
                    repeat={repeat}
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