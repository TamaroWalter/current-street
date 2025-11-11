import { useState } from "react";
import { Button, Container, Image, Box, Text } from "@chakra-ui/react";

import { getIcon, getString} from '../core/lib';
import photos from "../data/photos.json";
import './About.css';

interface Photo {
  id: number;
  source: string;
  alt: string;
}


const SingleImage = ({id, source, alt}: Photo) => {
  return (
    <Image key={id} height="100%" width="100%" fit="contain" rounded="md" src={source} alt={alt}/>
  );
}

const SlideShow = () => {
  const [imageId, setImageId] = useState(0);
  const currentPhoto = photos[imageId];

  const prev = () => {
    setImageId((prevId) => (photos.length ? (prevId - 1 + photos.length) % photos.length : 0));
  };

  const next = () => {
    setImageId((prevId) => (photos.length ? (prevId + 1) % photos.length : 0));
  };

  return (
    <Box className="image-slideshow">

      <Box className="image-buttons">
        <Button className="button-left" onClick={prev}>
          {getIcon('arrow_left')}
        </Button>
        <Button className="button-right" onClick={next}>
          {getIcon('arrow_right')}
        </Button>
      </Box>
      <Box className="image-box">
        {currentPhoto ? (
          <SingleImage id={currentPhoto.id} source={currentPhoto.source} alt={currentPhoto.alt} />
        ) : null}
      </Box>
    </Box>
  );

}

export default function About() {
  return (
    <Container>
      <Text className="about-description" rounded="md">
        {getString("currentstreet_description")}
      </Text>
      <SlideShow />
    </Container>
  );
}
