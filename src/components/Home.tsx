import {Link} from 'react-router-dom';
import { Box, Stack, Card, Image, Icon, Link as ChakraLink, Button, Container, VStack, HStack, Text} from "@chakra-ui/react";
import { useTranslation } from '../core/LanguageContext';
import { getIcon } from '../core/lib';
import { colors } from "../core/theme";
import photos from "../data/photos.json";
import socials from "../data/social.json";

export default function Home() {
  const { getString } = useTranslation();
  const spotify = socials.find(social => social.icon == "spotify")!;
  return (
    <Container>
      <VStack gap="5">
        {/** Main Hero */}
        <Card.Root w="100%" borderRadius="2xl" borderColor={colors.bg_dark} bg={colors.bg_dark} pt={{ base: "1rem", md: "3rem" }} pb="1rem">
          <Card.Body gap="2">
            <Card.Description display="flex" justifyContent="center" alignContent="center">
              <VStack align="center">
                <Text fontSize="6xl" fontWeight="medium" color={colors.accentwhite} textAlign="center">
                  {getString("title")}
                </Text>
                <Text fontSize="md" color={colors.accentwhite} textAlign="center">
                  {getString("hero_desc")}
                </Text>
                <HStack pt="2rem">
                  <Button bg={colors.hover} variant="solid" asChild>
                    <Link className="navigation-item" to={spotify.href} >{getIcon('spotify')} {getString("hero_music")}</Link>
                  </Button>
                  <Button variant="outline">
                      <Link className="navigation-item" to="/live"><Text color={colors.accentwhite}>{getString("hero_live")}</Text></Link>
                  </Button>
                </HStack>
              </VStack>
            </Card.Description>
          </Card.Body>
        </Card.Root>

        {/** Next concert and current Single
        <Card.Root w="100%" borderRadius="2xl">
          <Card.Body gap="2">
            <Card.Title></Card.Title>
            <Card.Description>
              Next Konzert and Current Single
            </Card.Description>
          </Card.Body>
        </Card.Root> */}

        {/** Booking
        <Card.Root w="100%" borderRadius="2xl">
          <Card.Body gap="2">
            <Card.Title>{getString("the_band")}</Card.Title>
            <Card.Description>
              Booking
            </Card.Description>
          </Card.Body>
        </Card.Root> */}
      </VStack>
    </Container>
  );
}


const OldHome = () => {
  const { getString } = useTranslation();
  const photo = photos.find(gig => gig.name == "city_light_cover");
  return (
      <Stack w="100%" display="flex" justify="center" align="center">
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