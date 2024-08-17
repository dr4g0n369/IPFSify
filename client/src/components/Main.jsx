import React from "react";

import Playlist from "./PlaylistCard";
import { SimpleGrid } from "@chakra-ui/react";

const playlists = [
  {
    classes: "",
    title: "sample-6s",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/7f1d1d/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden sm:block",
    title: "Playlist title 2",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/365314/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden lg:block",
    title: "Playlist title 3",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/164e63/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden xl:block",
    title: "Playlist title 4",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/1e3a8a/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden 2xl:block",
    title: "Playlist title 5",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/365314/fff?text=Cover&font=lobster",
  },
  {
    classes: "hidden 3xl:block",
    title: "Playlist title 6",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    coverUrl: "https://fakeimg.pl/600/164e63/fff?text=Cover&font=lobster",
  },

];

function Main() {
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
            {playlists.map((playlist) => (
              <Playlist key={playlist.title} {...playlist} />
            ))}
          </SimpleGrid>
        </div>
      </div>
    </main>
  );
}

export default Main;
