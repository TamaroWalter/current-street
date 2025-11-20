import type { IconButtonProps } from "@chakra-ui/react"
import { AspectRatio, Box, Carousel, Container, IconButton, Image, Blockquote } from "@chakra-ui/react"
import { forwardRef } from "react"
import { getIcon, getString } from '../core/lib';
import photos from "../data/photos.json";
import './About.css';


export default function About() {
  return (
    <Container className="about-root">
      <SlideShow />
      <BandDescription/>
    </Container>
  );
}

const SlideShow = () => {
  return (
     <Carousel.Root
        slideCount={photos.length}
        maxW={{base: "2xl", md: "3xl"}}
        mx="auto"
        gap="4"
        position="relative"
        colorPalette="white"
    >
        <Carousel.Control gap="4" width="full" position="relative">
        <Carousel.PrevTrigger asChild>
            <ActionButton insetStart="4">
              {getIcon('arrowleft')}
            </ActionButton>
        </Carousel.PrevTrigger>

        <Carousel.ItemGroup width="full">
            {photos.map((photo) => (
             <PhotoImage key={photo.id} id={photo.id} source={photo.source} alt={photo.alt}/>
            ))}
        </Carousel.ItemGroup>

        <Carousel.NextTrigger asChild>
            <ActionButton insetEnd="4">
              {getIcon('arrowright')}
            </ActionButton>
        </Carousel.NextTrigger>

        <Box position="absolute" bottom="6" width="full">
            <Carousel.Indicators
            transition="width 0.2s ease-in-out"
            transformOrigin="center"
            opacity="0.5"
            boxSize="2"
            _current={{ width: "10", bg: "colorPalette.subtle", opacity: 1 }}
            />
        </Box>
        </Carousel.Control>
    </Carousel.Root>
  );

}

const BandDescription = () => {
  return (
    <Blockquote.Root className="background-box band-description" justify="center">
      <Blockquote.Content>
        {getString("currentstreet_description")}
      </Blockquote.Content>
    </Blockquote.Root>
  );
}

// Single Components.
const PhotoImage = ({ id, source, alt }: Photo) => {
  return (
    <Carousel.Item key={id} index={id}>
      <AspectRatio ratio={16 / 9} maxH="72vh" w="full">
        <Box display="flex" alignItems="center" justifyContent="center">
          <Image
            src={source}
            alt={alt}
            objectFit="contain"
            maxH="100%"
            maxW="100%"
          />
        </Box>
      </AspectRatio>
    </Carousel.Item>
  )
}

const ActionButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function ActionButton(props, ref) {
    return (
      <IconButton
        {...props}
        ref={ref}
        size="xs"
        variant="outline"
        rounded="full"
        position="absolute"
        zIndex="1"
        bg="bg"
      />
    )
  },
)

// Interfaces and Data objects.
interface Photo {
  id: number;
  source: string;
  alt: string;
}