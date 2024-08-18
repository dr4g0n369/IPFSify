/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, repeat }) => {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            if (isPlaying) {
                console.log(ref.current.src);
                ref.current.play();
            } else {
                ref.current.pause();
            }
        }
    }, [isPlaying])

    useEffect(() => {
        ref.current.volume = volume;
    }, [volume]);
    useEffect(() => {
        ref.current.currentTime = seekTime;
    }, [seekTime]);

    return (
        <audio
            src={activeSong.uri_name}
            ref={ref}
            loop={repeat}
        ></audio>
    );
};

export default Player;