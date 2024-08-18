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
import { useNavigate, useNavigation } from "react-router-dom";
import { useAudio } from "../contexts/audioPlayer";

function PlaylistCard({ classes, coverUrl, title }) {
  const navigate = useNavigate();
  const { setActiveSong, setIsActive } = useAudio();
  const handleOnClickSong = () => {
    setActiveSong({ uri_name: `/src/assets/audioFiles/${title}.mp3`, title: title })
    setIsActive(true);
    // navigate(`/playlist/${title}`);
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
