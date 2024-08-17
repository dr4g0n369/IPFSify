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

function PlaylistCard({ classes, coverUrl, title, description }) {
  const navigate = useNavigate();
  return (
    <Card
      maxW="sm"
      bg="transparent"
      className="hover:bg-sky-700"
      cursor={"pointer"}
      onClick={() => navigate(`/playist-${title}`)}
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
