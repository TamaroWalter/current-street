import { Button, Container, Image, IconButton, Box } from "@chakra-ui/react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { useState } from "react";
import photos from "../data/photos.json";
import './About.css';

interface Photo {
  id: number;
  source: string;
  alt: string;
}


const SingleImage = ({id, source, alt}: Photo) => {
  return (
    <Image key={id} height="100%"  width="100%"fit="contain" rounded="md" src={source} alt={alt}/>
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
    <Container className="image-container">

      <Box className="image-buttons">
        <Button className="button-left" onClick={prev}>
      
        </Button>
        <Button className="button-right" onClick={next}>

        </Button>
      </Box>
      <Box className="image-box">
        {currentPhoto ? (
          <SingleImage id={currentPhoto.id} source={currentPhoto.source} alt={currentPhoto.alt} />
        ) : null}
      </Box>
    </Container>
  );

}

export default function About() {
 return <SlideShow />;
}
