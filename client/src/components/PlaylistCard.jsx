import { useState, useLayoutEffect } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../contexts/audioPlayer";


function PlaylistCard({ coverUrl, title, Likes,CIDhash }) {

  const navigate = useNavigate();
  const { setActiveSong, setIsActive } = useAudio();
  const handleOnClickSong = () => {
    console.log({coverUrl, title, Likes, CIDhash});

    setActiveSong({ uri_name: `/src/assets/audioFiles/${title}.mp3`, title: title ,CIDhash:CIDhash,Likes:Likes});
    setIsActive(true);

  }

  return (
    <Card
      maxW="sm"
      bg="transparent"
      className="hover:bg-sky-700"
      cursor={"pointer"}
      onClick={() => handleOnClickSong()}
    >
      <CardBody>
        <Image src={coverUrl} alt={title} borderRadius="sm" />
        <Stack mt="6" spacing="3">
          <Heading color="white" size="md">
            {title}
          </Heading>
        </Stack>
      </CardBody>
    </Card>
 );
}

export default PlaylistCard;
