import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

const Controls = ({ isActive, isPlaying, repeat, setRepeat, shuffle, setShuffle, handlePlayPause }) => {
    console.log({ isActive });

    return (
        <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
            <BsArrowRepeat
                size={20}
                color={repeat ? 'red' : 'white'}
                onClick={() => isActive && setRepeat(prev => !prev)}
                className="hidden sm:block cursor-pointer"
            />
            <MdSkipPrevious
                size={30}
                color="#FFF"
                className="cursor-pointer"
            />
            {isPlaying ? (
                <BsFillPauseFill
                    size={45}
                    color="#FFF"
                    onClick={() => { isActive && handlePlayPause() }}
                    disabled={!isActive}
                    className="cursor-pointer"
                />
            ) : (
                <BsFillPlayFill
                    size={45}
                    color="#FFF"
                    onClick={() => { isActive && handlePlayPause() }}
                    disabled={!isActive}
                    className="cursor-pointer"
                />
            )}
            <MdSkipNext
                size={30}
                color="#FFF"
                className="cursor-pointer"
            />
            <BsShuffle
                size={20}
                color={shuffle ? 'red' : 'white'}
                onClick={() => { isActive && setShuffle(prev => !prev) }}
                disabled={!isActive}
                className="hidden sm:block cursor-pointer"
            />
        </div>
    );
};

export default Controls;
