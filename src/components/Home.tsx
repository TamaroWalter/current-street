import {Link} from 'react-router-dom';
import { Box, Stack, Card, Image, Link as ChakraLink, Button, Container, VStack, HStack, Text, Spacer, Flex} from "@chakra-ui/react";
import { useTranslation } from '../core/LanguageContext';
import { getIcon } from '../core/lib';
import { colors } from "../core/theme";
import socials from "../data/social.json";
import gigs from "../data/gigs.json";
import records from "../data/records.json";

export default function Home() {
  return (
    <Container minH="100%" h="100%">
      <VStack gap="5" w="100%" minH="100%" h="100%">
        <Hero/>

        {/** Next concert and current Single */}
        <Stack direction={{base: "column", md:"row"}} w="100%">
          <NextGig/>
          <Spacer/>
          <LatestSingle/>
        </Stack>
        <Spacer/>
        {/** Booking */}
        <Booking/>
      </VStack>
    </Container>
  );
}

const Hero = () => {
  const { getString } = useTranslation();
  const spotify = socials.find(social => social.icon == "spotify")!;
  return (
    <Card.Root w="100%" borderRadius="2xl" borderColor={colors.bg_dark} bg={colors.bg_dark_lighter} pt={{ base: "1rem", md: "3rem" }} pb="1rem">
      <Card.Body gap="2">
        <Card.Description display="flex" justifyContent="center" alignContent="center">
          <VStack align="center">
            <Text fontSize="6xl" fontWeight="medium" color={colors.accentwhite} textAlign="center">
              {getString("band_name")}
            </Text>
            <Text fontSize="md" color={colors.accentwhite} textAlign="center">
              {getString("hero_desc")}
            </Text>
            <Button mt="2rem" bg={colors.hover} variant="solid" asChild>
              <ChakraLink href={spotify.href}>
                {getIcon('spotify')} <Text>{getString("hero_music")}</Text>
              </ChakraLink>
            </Button>
          </VStack>
        </Card.Description>
      </Card.Body>
    </Card.Root>
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
    <Card.Root borderRadius="xl" w={{base: "100%", md:"50%"}}>
      <Card.Body>
        <Text fontSize="xs" textTransform="uppercase" letterSpacing="wider" color={colors.gray} mb="3">
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
            <Text fontSize="sm" color={colors.gray}>{nextGig.city} - {getString('hour', timeStr)}</Text>
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

const LatestSingle = () => {
  const { getString } = useTranslation();
  const single = records.sort((a,b) => b.release - a.release )[0];

  return (
    <Card.Root borderRadius="xl" w={{base: "100%", md:"50%"}}>
      <Card.Body>
        <Text fontSize="xs" textTransform="uppercase" letterSpacing="wider" color={colors.gray} mb="3">
          {getString("latest_single")}
        </Text>
        <HStack align="flex-start" gap="3">
          <Box textAlign="center" bg={colors.hover} color={colors.accentwhite} borderRadius="lg" minW="6rem">
            <Image borderRadius="lg" maxW="6rem" src={single.cover} alt="John Doe"/>
          </Box>
          <Box w="100%">
            <Text fontWeight="medium">{single.name}</Text>
            <Flex direction={{base: "column", md: "row"}} wrap="wrap" align={{base: "stretch", md: "flex-start"}} mt="3" px={{base:"0.5rem" , md: "0rem"}} gap="2">
              <Button size="xs" variant="outline" flex={{md: "1"}} minW={{md: "fit-content"}} asChild>
                <a href={single.spotify} target="_blank" rel="noopener noreferrer">
                  {getIcon('spotify')} Spotify
                </a>
              </Button>
              <Button size="xs" variant="outline" flex={{md: "1"}} minW={{md: "fit-content"}} asChild>
                <a href={single.apple} target="_blank" rel="noopener noreferrer">
                  {getIcon('apple')} Apple Music
                </a>
              </Button>
              <Button size="xs" variant="outline" flex={{md: "1"}} minW={{md: "fit-content"}} asChild>
                <a href={single.youtube} target="_blank" rel="noopener noreferrer">
                  {getIcon('youtube')} Youtube
                </a>
              </Button>
            </Flex>
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}

const Booking = () => {
  const { getString } = useTranslation();
  const email = socials.find(social => social.icon == "gmail")!;
  return (
    <Flex minH="3rem" w="100%" bg={colors.bg_dark} border="1px dashed" borderColor={colors.gray} borderRadius="lg" px="3" py="2.5" justify="start" align="center" gap="2">
      <Text fontSize="xs"color={colors.accentwhite}>
        {getString("contact_us")}
      </Text>
      <ChakraLink href={email.href} colorPalette="gray" target="_blank" rel="noopener noreferrer">
        <Text fontSize="xs" color={colors.hover}>
          {getString('email')}
        </Text>
      </ChakraLink>
    </Flex>
  );
}
