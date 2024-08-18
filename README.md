# IPFSify

*Stream Your Tunes, Own the Experience: Decentralized Music Streaming Powered by IPFS & Web3.*
## Overview

**IPFSify** is a cutting-edge decentralized audio streaming platform that leverages the power of IPFS (InterPlanetary File System) and Web3 technology. The backend is built with **Express.js**, while the frontend is crafted with **React.js**. Users can stream, upload, and like songs on the IPFS network, ensuring a seamless and decentralized music experience.

## Features

- **Stream Songs:** Enjoy seamless audio streaming directly from the IPFS network.
- **Upload Songs:** Share your favorite tracks by uploading them to the decentralized network.
- **Like Songs:** Show your appreciation for songs by liking them.

## Future Enhancements

Our vision for IPFSify includes the following future developments:

- **Song Ownership:** Introduce a feature to specify the owner/uploader of each song.
- **Reward System:** Implement a reward mechanism using blockchain tokens for song owners.
- **Search Functionality:** Add a search option to make finding songs easier.

## Getting Started

Follow the instructions below to set up the IPFSify platform locally.

### Client Setup

1. Open your terminal and navigate to the project root directory.
2. Run the following commands:
   ```bash
   cd client
   npm install
   npm run dev
   ```

### Backend Setup

1. From the project root directory, open your terminal.
2. Run the following commands:
   ```bash
   cd backend
   npm install
   node index.js
   ```

### IPFS Server Setup

1. Install IPFS from the official site: [Install IPFS](https://dist.ipfs.tech/#kubo).
2. After installation, navigate to the directory where IPFS is installed.
3. Run the following commands to initialize and start the IPFS server locally:
   ```bash
   ./kubo/ipfs init
   ./kubo/ipfs daemon
   ```

Now, open your browser and navigate to `http://localhost:5173/` to start using IPFSify.
