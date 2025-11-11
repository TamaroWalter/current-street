import { Flex, Button, Container, Image, IconButton, Box } from "@chakra-ui/react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { useState } from "react";
import photos from "../data/photos.json";
//import './About.css';

export default function About() {
  const [index, setIndex] = useState(0);

  const prevImage = () =>
    setIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  const nextImage = () =>
    setIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  return (
    <Box maxW="6xl" mx="auto" px={4} py={8}>
      {/* Slideshow-Container */}
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="xl"
        height="40rem"
      >
        {/* Bild */}
        <Image
          src={photos[index].source}
          alt={`Slide ${index + 1}`}
          objectFit="cover"
          w="100%"
          h="100%"
        />

        {/* Buttons – immer sichtbar */}
        <Flex
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          justify="space-between"
          align="center"
          px={4}
          pointerEvents="none" // wichtig, damit nur die Buttons klicken, nicht das unsichtbare Flex
        >
          <IconButton
            aria-label="Previous"
            onClick={prevImage}
            pointerEvents="auto"
            bg="whiteAlpha.700"
            _hover={{ bg: "whiteAlpha.900" }}
            borderRadius="full"
          />
          <IconButton
            aria-label="Next"
            onClick={nextImage}
            pointerEvents="auto"
            bg="whiteAlpha.700"
            _hover={{ bg: "whiteAlpha.900" }}
            borderRadius="full"
          />
        </Flex>
      </Box>
    </Box>
  );
}
