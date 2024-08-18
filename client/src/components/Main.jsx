import React, { useEffect, useState } from "react";
import Playlist from "./PlaylistCard";
import { SimpleGrid } from "@chakra-ui/react";
import { useWeb3 } from "../contexts/web3context";


const Main = () => {
  const initialPlaylists = [];
  const { contract, account } = useWeb3();
  const [playlists, setPlaylists] = useState(initialPlaylists);
  const [fetched, setFetched] = useState(false); // Track if data has been fetched


  useEffect(() => {
    const getSongs = async () => {
      if (contract && account && !fetched) {
        try {
          const result = await contract.methods.getSongs().call();
          console.log("Fetched Songs:", result);
          const newSongs = result.map((song) => ({
            title: song.SongName,
            CIDhash: song.CIDHash,
            coverUrl: "https://media.istockphoto.com/id/1199639244/vector/music-notes-neon-icon.jpg?s=612x612&w=0&k=20&c=2PR9RDBk6QrEsaHtNgQ9_CK2W9WM8GScp649NcI2o_c=",
            Likes: song.Likes ? song.Likes : 0,
          }));
          setPlaylists(newSongs); // Set playlists directly
          setFetched(true); // Mark as fetched
          console.log("Updated Playlists:", newSongs);
        } catch (contractError) {
          console.log("Error:", contractError);
        }
      }
    };
    getSongs();
  }, [contract, account, fetched]); // Include fetched to control data fetching

  return (
    <main className="text-white relative">
      <div className="h-[100vh] bg-gradient-to-b from-[#1f1f1f] to-[#121212] absolute w-full"></div>
      <div className="relative pt-[24px] pb-[48px] px-[32px] space-y-9 max-w-screen-5xl">
        <div>
          <div className="flex flex-wrap justify-between items-end gap-x-6 mb-[18px]">
            <div>
              <h2 className="text-2xl font-semibold capitalize">
                <p>August hits</p>
              </h2>
            </div>
            <a
              href="/all-playlists"
              className="uppercase text-xs font-semibold tracking-widest hover:underline text-[#b3b3b3] leading-6"
            >
              See all
            </a>
          </div>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(175px, 1fr))"
          >
            {playlists.map((playlist, index) => (
              <Playlist key={playlist.title + index} CIDhash={playlist.CIDhash} Likes={playlist.Likes} coverUrl={playlist.coverUrl} title={playlist.title} />
            ))}
          </SimpleGrid>
        </div>
      </div>
    </main>
  );
}

export default Main;
