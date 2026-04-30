import {Link} from 'react-router-dom';
import { Box, Stack, Card, Image, Icon, Link as ChakraLink, Button, Container, VStack, HStack, Text, Spacer} from "@chakra-ui/react";
import { useTranslation } from '../core/LanguageContext';
import { getIcon } from '../core/lib';
import { colors } from "../core/theme";
import photos from "../data/photos.json";
import socials from "../data/social.json";
import gigs from "../data/gigs.json";

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
                    <Link className="navigation-item" to={spotify.href}>
                      <HStack color={colors.accentwhite}>
                        {getIcon('spotify')}
                        <Text>{getString("hero_music")}</Text>
                      </HStack>
                    </Link>
                  </Button>
                  <Button variant="outline">
                      <Link className="navigation-item" to="/live"><Text color={colors.accentwhite}>{getString("hero_live")}</Text></Link>
                  </Button>
                </HStack>
              </VStack>
            </Card.Description>
          </Card.Body>
        </Card.Root>


        {/** Next concert and current Single */}
        <Stack direction={{base: "column", md:"row"}} w="100%">
          <NextGig/>
          <Spacer/>
          {/** 
          <Card.Root borderRadius="2xl" w={{base: "100%", md:"50%"}}>
            <Card.Body gap="2">
              <Text fontSize="xs" textTransform="uppercase" letterSpacing="wider" color={colors.accentgreen} mb="3">
                Newest Single
              </Text>
            </Card.Body>
          </Card.Root> */} 
        </Stack>
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

const NextGig = () => {
  const { getString, getTimeFormat } = useTranslation();
  const nextGig = gigs.filter(gig => gig.time > (Date.now() / 1000)).sort((a,b) => a.time - b.time)[0];
  const time = new Date(nextGig.time * 1000);
  const timeStr = time.toLocaleString(getTimeFormat(), { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' });  
  const day = time.toLocaleString(getTimeFormat(), { timeZone: 'Europe/Berlin', day: '2-digit'});
  const month = time.toLocaleString(getTimeFormat(), { timeZone: 'Europe/Berlin', month: 'short'});
  const year = time.toLocaleString(getTimeFormat(), { timeZone: 'Europe/Berlin', year: 'numeric'});
  const mapsQuery = `${nextGig.adress}, ${nextGig.city}, ${nextGig.location}`;
  return (
    <Card.Root borderRadius="xl" w={{base: "100%", md:"100%"}}> {/** Change md to 50 later when the second one is there */}
      <Card.Body>
        <Text fontSize="xs" textTransform="uppercase" letterSpacing="wider" color={colors.accentgreen} mb="3">
          {getString('upcoming_gig')}
        </Text>
        <HStack align="flex-start" gap="3">
          <Box textAlign="center" bg={colors.hover} color={colors.accentwhite} borderRadius="lg" px="3" py="2" minW="5rem">
            <Text fontSize="xs" textTransform="uppercase" letterSpacing="wide">{month}</Text>
            <Text fontFamily="Impact, sans-serif" fontSize="3xl" lineHeight="1">{day}</Text>
            <Text fontSize="xs">{year}</Text>
          </Box>
          <Box>
            <Text fontWeight="medium">{nextGig.name}</Text>
            <Text fontSize="sm" color={colors.accentgreen}>{nextGig.city} - {getString('hour', timeStr)}</Text>
            <HStack mt="3" gap="2">
              <Button size="xs" bg={colors.bg} color={colors.accentwhite} asChild>
                {nextGig.ticketUrl && nextGig.ticketUrl.trim() ? (
                  <a href={nextGig.ticketUrl} target="_blank" rel="noopener noreferrer">
                    {getString('ticket')} {getIcon('ticket')}
                  </a>
                ) : (
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`} target="_blank" rel="noopener noreferrer">
                    {getString("directions")} {getIcon('googlemaps')}
                  </a>
                )}
              </Button>
              <Button size="xs" variant="outline" asChild>
                <Link to="/live"><Text>{getString('all_gigs')}</Text></Link>
              </Button>
            </HStack>
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
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