import {Container, Button, Text, Flex, HStack,Stack, VStack, Box, Link as ChakraLink, Icon, Collapsible} from "@chakra-ui/react";
import { getIcon, getString, downloadICS} from "../core/lib";
import gigs from "../data/gigs.json";
import './Live.css';

interface Gig {
  id: number;
  name: string;
  time: number;
  city: string;
  adress?: string;
  location?: string;
  description?: string;
  ticketUrl?: string;
}

const GigCard = ({id, name, time, city, adress, location, description, ticketUrl}: Gig) => {
  // Get the date and time from the timestamp with seconds time.
  const date = new Date(time * 1000);
  // Get the date in format DD Month YY and the time in format HH:MM for a german timezone.
  const dateOpt: Intl.DateTimeFormatOptions = { timeZone: 'Europe/Berlin', year: '2-digit', month: '2-digit', day: '2-digit'};
  const timeOpt: Intl.DateTimeFormatOptions = { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' };
  const dateStr = date.toLocaleString('de-DE', dateOpt);
  const timeStr = date.toLocaleString('de-DE', timeOpt);
  const mapsQuery = `${adress}, ${city}, ${location}`;

  return (
    <Collapsible.Root>
      <Container key={id} className="live-gig" minHeight="3rem" w="100%" maxW={{ base: "100%", md: "50rem", lg: "64rem", xl: "72rem" }}>
        <Box className="live-gig-header" paddingTop="3" display="flex" width="100%" justifyContent="space-between">
          <Flex width="100%" gap="0.5rem" direction={{ base: "column", md: "row" }} align={{ base: "start", md: "center" }}>
            <Text fontSize="2xl" fontWeight="bold">{dateStr} - {timeStr}</Text>
            <Text fontSize="2xl" fontWeight="bold">{name}</Text>
          </Flex>
          <Collapsible.Trigger alignSelf="flex-start" display="flex" gap="2" alignItems="center">
              <Collapsible.Indicator transition="transform 0.2s" _open={{ transform: "rotate(180deg)" }}>
                <Box fontSize="1.75rem" lineHeight="1">
                  {getIcon("chevrondown")}
                </Box>
              </Collapsible.Indicator>
            </Collapsible.Trigger>
        </Box>
        <Stack direction={{ base: "column", md: "row" }} align="stretch">
          <Box className="live-gig-info" display="flex" flexDirection="column" width={{base: "100%", md: "70%"}}>
            <VStack align="start" gap="1rem" flex="1">
              <Box flex="1" width="100%">
                <Collapsible.Content className="live-gig-description">
                  <Text whiteSpace="pre-line"> {description} </Text>
                </Collapsible.Content>
              </Box>
              <Flex width="100%" marginTop="auto">
                <Text fontWeight="bold">{adress} {city}</Text>
              </Flex>
            </VStack>
          </Box>
          <Flex padding="0.75rem" paddingTop="0" width={{base: "100%", md: "30%"}} alignSelf={{base:"center", md:"flex-start"}} align="center" justify={{ base: "center", md: "flex-end" }}>
            <VStack>
              <Button className="live-gig-action" rounded="md" size="md" asChild>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`} target="_blank" rel="noopener noreferrer">
                  {getString("directions")} {getIcon('googlemaps')}
                </a>
              </Button>
                <Collapsible.Content className="live-gig-description" w="100%">
                  <Stack direction={{ base: "row", md: "column" }}>
                    <Button className="live-gig-action" rounded="md" size="md" onClick={() => downloadICS(name, time, adress!, description, ticketUrl)}>
                      {getString('calendar')} {getIcon('calendarsave')}
                    </Button>
                    {ticketUrl && (
                      <Button className="live-gig-action" rounded="md" size="md" asChild>
                        <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
                          {getString('ticket')} {getIcon('ticket')}
                        </a>
                      </Button>
                    )}
                  </Stack>
                </Collapsible.Content>
            </VStack>
          </Flex>
        </Stack>
      </Container>
    </Collapsible.Root>
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
    <Container>
      <Stack>
        <Box marginBottom="5rem">
          <Flex align="left">
            <Text fontSize="3xl" fontWeight="bold">{getString("upcoming_gigs")}</Text>
          </Flex>
          <Container w="100%" paddingTop="1rem" maxWidth={{ base: "100%", md: "50rem", lg: "64rem", xl: "72rem" }}>
            <Stack className="live-dates" gap="1rem">
              {upcomingGigs.length > 0 ? (
                upcomingGigs.toReversed().map((gig) => (
                  <GigCard 
                    key={gig.id}
                    id={gig.id}
                    name={gig.name}
                    time={gig.time}
                    city={gig.city}
                    adress={gig.adress}
                    location={gig.location}
                    description={gig.description}
                    ticketUrl={gig.ticketUrl}/>
                ))
              ) : (
                <Stack>
                  <Text fontSize="xl" fontWeight="bold"> {getString("no_upcoming_gigs")}</Text>
                  <iframe
                    className="spotify-embed"
                    src="https://open.spotify.com/embed/artist/4S3tOMrY2Xj9zhnmema3M3?utm_source=generator"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy">
                  </iframe>
                </Stack>
              )
              }
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
    </Container>
  )
}
