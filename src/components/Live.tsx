import {Container, Button, Text, Flex, Stack, VStack, Box} from "@chakra-ui/react";
import { getIcon, getString} from "../core/lib";
import gigs from "../data/gigs.json";
import './Live.css';

interface Gig {
  id: number;
  name: string;
  time: number;
  city: string;
  adress?: string;
  location?: string;
}

const GigCard = ({id, name, time, city, adress, location}: Gig) => {
  // Get the date and time from the timestamp with seconds time.
  const date = new Date(time * 1000);
  // Get the date in format DD Month YY and the time in format HH:MM for a german timezone.
  const dateOpt: Intl.DateTimeFormatOptions = { timeZone: 'Europe/Berlin', year: '2-digit', month: '2-digit', day: '2-digit'};
  const timeOpt: Intl.DateTimeFormatOptions = { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' };
  const dateStr = date.toLocaleString('de-DE', dateOpt);
  const timeStr = date.toLocaleString('de-DE', timeOpt);
  return (
    <Container key={id} className="live-gig" minHeight="3rem" maxWidth="50rem">
      <Stack height="100%" direction={{ base: "column", md: "row" }}>
        <Box className="live-gig-info" height="100%" width={{base: "100%", md: "70%"}}>
          <VStack align="start" gap="1rem" height="100%">
            <Flex width="100%" gap="0.5rem" direction={{ base: "column", md: "row" }} align={{ base: "start", md: "center" }}>
              <Text fontSize="2xl" fontWeight="bold">{dateStr} - {timeStr}</Text>
              <Text fontSize="2xl" fontWeight="bold">{name}</Text>
            </Flex>
            <Flex width="100%">
              <Text fontWeight="bold">{adress} {city}</Text>
            </Flex>
          </VStack>
        </Box>
        <Flex padding="0.75rem" width={{base: "100%", md: "30%"}} align="center" justify="center">
          <Button className="live-gig-maps" rounded="md" size="md" asChild>
            <a href={`https://www.google.com/maps?q=${location}`} target="_blank" rel="noopener noreferrer">
              {getString("directions")} {getIcon('googlemaps')}
            </a>
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
}

const PastGigCard = ({id, name, time, city} : Gig) => {
  const date = new Date(time * 1000);
  const dateOpt: Intl.DateTimeFormatOptions = { timeZone: 'Europe/Berlin', year: '2-digit', month: '2-digit', day: '2-digit'};
  const dateStr = date.toLocaleString('de-DE', dateOpt);

  return (
     <Container key={id} className="live-gig" minHeight="3rem" maxWidth="50rem">
      <Box className="live-gig-info" height="100%" width={{base: "100%", md: "100%"}}>
        <VStack align="start" gap="1rem" height="100%">
          <Flex width="100%" gap="0.5rem" direction={{ base: "column", md: "row" }} justify="center">
            <Text fontSize="xl" fontWeight="bold">{dateStr} - {name}</Text>
            <Text fontSize="xl" fontWeight="bold">({city})</Text>
          </Flex>
        </VStack>
      </Box>
    </Container>
  );
}

export default function Live() {
  const now = Date.now() / 1000;
  const upcomingGigs = gigs.filter(gig => gig.time >= now);
  const pastGigs = gigs.filter(gig => gig.time < now);
  return (
    <Stack >
      <Box marginBottom="5rem">
        <Flex align="left">
          <Text fontSize="3xl" fontWeight="bold">{getString("upcoming_gigs")}</Text>
        </Flex>
        <Container maxWidth="50rem">
          <Stack className="live-dates" gap="1rem">
            {upcomingGigs.map((gig) => (
              <GigCard key={gig.id} id={gig.id} name={gig.name} time={gig.time} city={gig.city} adress={gig.adress} location={gig.location} />
            ))}
          </Stack>
        </Container>
      </Box>
      <Box>
        <Flex align="left">
          <Text fontSize="3xl" fontWeight="bold">{getString("past_gigs")}</Text>
        </Flex>
        <Container maxWidth="50rem" paddingLeft={{base: "0.1rem", md: "6.5rem"}} paddingRight={{base: "0.1rem", md: "6.5rem"}}>
          <Stack className="live-dates" gap="1rem">
            {pastGigs.map((gig) => (
              <PastGigCard key={gig.id} id={gig.id} name={gig.name} time={gig.time} city={gig.city} />
            ))}
          </Stack>
        </Container>
      </Box>
    </Stack>
  )
}
