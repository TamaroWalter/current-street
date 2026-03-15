import {Stack, Card, Image, Link as ChakraLink} from "@chakra-ui/react";
import {getString} from "../core/lib";
import photos from "../data/photos.json";

import './Home.css';
export default function Home() {
  const photo = photos.find(gig => gig.name == "city_light_cover");
  return (
      <Stack className="home-root">
        <ChakraLink className="footer-social"
                    href={"https://open.spotify.com/album/0m7NLH39VIxdKQu7b9Qor8?si=leUWrvx5RiSf9U-ZU-FQAg"}
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