import {Container, Button, Text, Flex, Menu, Stack, VStack, Box, Collapsible, Portal} from "@chakra-ui/react";
import { getIcon } from "../core/lib";
import { colors } from "../core/theme";
import { getCalendarUrl, type CalendarAction } from "../core/calendar";
import { useTranslation } from '../core/LanguageContext';
import gigs from "../data/gigs.json";

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
  const { getString, getTimeFormat } = useTranslation();
  // Get the date and time from the timestamp with seconds time.
  const date = new Date(time * 1000);
  const dateStr = date.toLocaleString(getTimeFormat(), { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit'});
  const timeStr = date.toLocaleString(getTimeFormat(), { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' });
  const mapsQuery = `${adress}, ${city}, ${location}`;
  const calendarlocation = adress + ', ' + city;

  const handleAddToCalendar = (action: CalendarAction) => {
    const result = getCalendarUrl(action, name, time, calendarlocation, description, ticketUrl);
    
    if (action === 'ics') {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(result as Blob);
      link.download = `CurrentStreet-${name}.ics`;
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      window.open(result as string, '_blank');
    }
  };

  return (
    <Collapsible.Root>
      <Container key={id} minH="3rem" w="100%" maxW={{ base: "100%", md: "50rem" }} borderWidth="2px" borderColor={colors.text} borderRadius="0.75rem" overflow="hidden" bg={colors.accentwhite}>
        <Box pt="3" display="flex" w="100%" justifyContent="space-between">
          <Flex w="100%" gap="0.5rem" direction={{ base: "column", md: "row" }} align={{ base: "start", md: "center" }}>
            <Text fontSize="2xl" fontWeight="bold">{dateStr}</Text>
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
          <Box h="100%" p="0.75rem" display="flex" flexDirection="column" w={{base: "100%", md: "70%"}} justifyContent="center">
              <Box w="100%">
                <Collapsible.Content>
                  <Text whiteSpace="pre-line"> {description} </Text>
                </Collapsible.Content>
              </Box>
          </Box>
          <Flex p="0.75rem" pt="0" w={{base: "100%", md: "30%"}} alignSelf={{base:"center", md:"flex-start"}} align="center" justify={{ base: "center", md: "flex-end" }}>
            <VStack>
              <Button color={colors.text} bg={colors.accentgreen} rounded="md" size="md" w="100%" asChild _hover={{ transform: 'scale(1.05)', bg: colors.hover, transition: 'transform 0.2s' }}>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`} target="_blank" rel="noopener noreferrer">
                  {getString("directions")} {getIcon('googlemaps')}
                </a>
              </Button>
              <Collapsible.Content w="100%">
                <Stack direction={{ base: "row", md: "column" }}>
                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <Button color={colors.text} bg={colors.accentgreen} rounded="md" size="md" _hover={{ transform: 'scale(1.05)', bg: colors.hover, transition: 'transform 0.2s' }}>
                        {getString('calendar')} {getIcon('calendarsave')}
                      </Button>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content minW={{base: "0", md: "15rem"}} minH={{base: "0", md: "7rem"}}>
                          <Menu.Item value="google" fontSize="md" p="0.75rem 1rem" onClick={() => handleAddToCalendar('google')}>
                            {getIcon('googlecalendar')} {getString('googlecalendar')}
                          </Menu.Item>
                          <Menu.Item value="outlook" fontSize="md" p="0.75rem 1rem" onClick={() => handleAddToCalendar('outlook')}>
                            {getIcon('outlook')} {getString('outlook')}
                          </Menu.Item>
                          <Menu.Item value="ics" fontSize="md" p="0.75rem 1rem" onClick={() => handleAddToCalendar('ics')}>
                            {getIcon('apple')} {getString('saveics')}
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                  {ticketUrl && (
                    <Button color={colors.text} bg={colors.accentgreen} rounded="md" size="md" asChild _hover={{ transform: 'scale(1.05)', bg: colors.hover, transition: 'transform 0.2s' }}>
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
        <Flex w="100%" marginTop="auto" pb="0.3rem">
          <Text fontWeight="bold">{getString('hour', timeStr)}, {adress} {city}</Text>
        </Flex>
      </Container>
    </Collapsible.Root>
  );
}

const PastGigCard = ({id, name, time, city} : Gig) => {
  const date = new Date(time * 1000);
  const dateOpt: Intl.DateTimeFormatOptions = { timeZone: 'Europe/Berlin', year: '2-digit', month: '2-digit', day: '2-digit'};
  const dateStr = date.toLocaleString('de-DE', dateOpt);

  return (
     <Container key={id} minH="3rem" maxW="50rem" borderWidth="2px" borderColor={colors.text}  borderRadius="0.75rem" overflow="hidden" bg={colors.accentwhite}>
      <Box h="100%" p="0.75rem" w={{base: "100%", md: "100%"}} display="flex" justifyContent="center">
        <VStack align="start" gap="1rem" h="100%">
          <Flex w="100%" gap="0.5rem" direction={{ base: "column", md: "row" }} justify="center">
            <Text fontSize="xl" fontWeight="bold">{dateStr} - {name}</Text>
            <Text fontSize="xl" fontWeight="bold">({city})</Text>
          </Flex>
        </VStack>
      </Box>
    </Container>
  );
}

export default function Live() {
  const { getString } = useTranslation();
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
          <Container w="100%" pt="1rem" maxW={{ base: "100%", md: "50rem", lg: "64rem", xl: "72rem" }}>
            <Stack justify="center" align="stretch" gap="1rem">
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
                     style={{
                      width: '100%',
                      height: '80vh',
                      maxWidth: '50rem',
                      maxHeight: '30rem',
                      borderRadius: '0.75rem',
                      border: 'none'
                    }}
                    src="https://open.spotify.com/embed/artist/4S3tOMrY2Xj9zhnmema3M3?utm_source=generator"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
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
          <Container maxW="50rem" pl={{base: "0.1rem", md: "6.5rem"}} pr={{base: "0.1rem", md: "6.5rem"}}>
            <Stack justify="center" align="stretch" gap="1rem">
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
