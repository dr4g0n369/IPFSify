import React from 'react';
import { CiHeart } from "react-icons/ci";
import { useWeb3 } from '../../contexts/web3context';

const Track = ({ activeSong }) => {
    const {contract,account, setFetched} = useWeb3();
    const handleLike =async() => {
        console.log('Like');
        const result = await contract.methods.likeSong(activeSong.title).send({ from: account });
        console.log("Contract method result:", result);
        setFetched(false);
    };  
    return (
        <div className="flex-1 flex items-center justify-start">
            <div className="w-[50%] flex items-center justify-center">
                <p className="truncate text-white font-bold text-lg">
                    {activeSong?.title ? activeSong?.title : 'No active Song'}
                </p>
                <p className='ml-10 mr-2 text-white'>{activeSong.Likes}</p> <CiHeart className="text-white cursor-pointer" onClick={handleLike} />
            </div>
        </div>
    );
};

export default Track;