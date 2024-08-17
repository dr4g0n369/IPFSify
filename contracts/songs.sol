// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract Songs {
    struct Song {
        string SongName;
        string CIDHash;
        uint256 likes;
    }

    mapping(string => Song) public GetSong;
    mapping(string => uint256) private songIndex;
    Song[] private songs;

    function getSongs() external view returns (Song[] memory) {
        return songs;
    }

    function addSong(string memory name, string memory hash)
        external
        returns (bool success)
    {
        require(bytes(name).length > 0, "Song name is required.");
        require(
            bytes(GetSong[name].SongName).length == 0,
            "Song already exists."
        );

        Song memory song = Song({SongName: name, CIDHash: hash, likes: 0});

        GetSong[name] = song;
        songs.push(song);
        songIndex[name] = songs.length - 1;

        return true;
    }

    function getSongByName(string memory name)
        public
        view
        returns (Song memory)
    {
        require(
            bytes(GetSong[name].SongName).length != 0,
            "Song does not exist."
        );
        return GetSong[name];
    }

    function likeSong(string memory name) external {
        require(
            bytes(GetSong[name].SongName).length != 0,
            "Song does not exist."
        );

        GetSong[name].likes++;

        uint256 index = songIndex[name];
        songs[index].likes = GetSong[name].likes;
    }

    function hello() public pure returns (string memory) {
        return "Hello from Contract";
    }
}
