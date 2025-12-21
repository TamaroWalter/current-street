import {Stack, Card, Image, Link as ChakraLink} from "@chakra-ui/react";
import {getString} from "../core/lib";
import photos from "../data/photos.json";

import './Home.css';
export default function Home() {
  const photo = photos.find(gig => gig.name == "all_alone_cover");
  return (
      <Stack className="home-root">
        <ChakraLink className="footer-social"
                    href={"https://open.spotify.com/intl-de/album/2A0Lc9jyeEoXT25PywOCsE?si=OoqQ5orSSjiOYU0p41RRAQ"}
                    colorPalette="gray"
                    target="_blank"
                    rel="noopener noreferrer"
                    _hover={{ textDecoration: "none" }}>
          <Card.Root width={{base:"24rem", md:"30rem"}} border="none" background="none">
            <Card.Body gap="2">

              <Card.Title textAlign="center">{getString("new_single")}</Card.Title>
              <Image src={photo?.source} alt={photo?.alt}/>
            </Card.Body>
          </Card.Root>
        </ChakraLink>
      </Stack>
  );
}