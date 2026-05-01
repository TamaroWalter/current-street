import { useState } from "react";
import {Box, Button, Collapsible, Container, Flex, Menu, Portal, Stack, Table, Tabs, Text } from "@chakra-ui/react";
import { getIcon } from "../core/lib";
import { getCalendarUrl, type CalendarAction } from "../core/calendar";
import { useTranslation } from "../core/LanguageContext";
import { colors } from "../core/theme";
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

const GigRow = ({ gig, isPast }: { gig: Gig; isPast: boolean }) => {
  const { getString, getTimeFormat } = useTranslation();
  const [open, setOpen] = useState(false);

  const date = new Date(gig.time * 1000);
  const dateStr = date.toLocaleDateString(getTimeFormat(), {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const timeStr = date.toLocaleTimeString(getTimeFormat(), {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
  });

  const hasDetails = Boolean(gig.description || gig.adress) && !isPast;
  const mapsQuery = `${gig.adress}, ${gig.city}, ${gig.location}`;
  const calendarLocation = `${gig.adress}, ${gig.city}`;

  const handleAddToCalendar = (action: CalendarAction) => {
    const result = getCalendarUrl(action, gig.name, gig.time, calendarLocation, gig.description, gig.ticketUrl);
    if (action === "ics") {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(result as Blob);
      link.download = `CurrentStreet-${gig.name}.ics`;
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      window.open(result as string, "_blank");
    }
  };

  return (
      <>
        {/* Row Header */}
        <Table.Row cursor={hasDetails ? "pointer" : "default"}
                   onClick={() => hasDetails && setOpen((o) => !o)}
                   _hover={{bg: colors.accentwhite_selected}}
                   bg={colors.accentwhite}
                   transition="background 0.15s"
                   w="100%"
        >
          <Table.Cell fontWeight="semibold" w={{ base: "40%", md: "25%" }}> {dateStr} </Table.Cell>
          <Table.Cell fontWeight="semibold" w={{ base: "45%", md: "50%" }}> {gig.name} </Table.Cell>
          <Table.Cell display={{ base: "none", md: "table-cell" }} w={{ base: "0%", md: "20%" }}>{gig.city}</Table.Cell>
          <Table.Cell display={hasDetails ? "table-cell" : "none"} w={{ base: "15%", md: "5%" }}>
            <Box display="inline-flex" fontSize="1.25rem" transform={open ? "rotate(180deg)" : "rotate(0deg)"} transition="transform 0.2s">
              {getIcon("chevrondown")}
            </Box>
          </Table.Cell>
        </Table.Row>

        {/* Gig detail information. Is a row too so it fits in the table design */}
        <Table.Row display={hasDetails ? "table-row" : "none"} bg={colors.accentwhite}>
          <Table.Cell colSpan={4} p="0" borderBottomWidth={open ? "1px" : "0"} borderBottomColor={colors.border} borderTop="none">
            <Collapsible.Root open={open}>
              <Collapsible.Content>
                <Box p="1rem 1.25rem" bg={colors.accentwhite}>
                  <Stack gap="3">
                    <Text whiteSpace="pre-line" fontSize="md">{gig.description}</Text>

                    {/* Action buttons */}
                    <Flex wrap="wrap" gap="2">
                      <Button size="sm" bg={colors.accentgreen} color={colors.text} _hover={{ bg: colors.hover }} asChild>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`}
                           target="_blank" rel="noopener noreferrer">
                          {getString("directions")} {getIcon("googlemaps")}
                        </a>
                      </Button>

                      <Menu.Root>
                        <Menu.Trigger asChild>
                          <Button size="sm" bg={colors.accentgreen} color={colors.text} _hover={{ bg: colors.hover }}>
                            {getString("calendar")}{" "} {getIcon("calendarsave")}
                          </Button>
                        </Menu.Trigger>
                        <Portal>
                          <Menu.Positioner>
                            <Menu.Content minW="13rem">
                              <Menu.Item value="google" onClick={() => handleAddToCalendar("google")}>
                                {getIcon("googlecalendar")}{" "} {getString("googlecalendar")}
                              </Menu.Item>
                              <Menu.Item value="outlook" onClick={() => handleAddToCalendar("outlook")}>
                                {getIcon("outlook")} {getString("outlook")}
                              </Menu.Item>
                              <Menu.Item value="ics" onClick={() => handleAddToCalendar("ics")}>
                                {getIcon("apple")} {getString("saveics")}
                              </Menu.Item>
                            </Menu.Content>
                          </Menu.Positioner>
                        </Portal>
                      </Menu.Root>

                      {gig.ticketUrl && (
                          <Button size="sm" bg={colors.accentgreen} color={colors.text} _hover={{ bg: colors.hover }} asChild>
                            <a href={gig.ticketUrl} target="_blank" rel="noopener noreferrer">
                              {getString("ticket")} {getIcon("ticket")}
                            </a>
                          </Button>
                      )}
                    </Flex>

                    <Text fontSize="sm" color={colors.gray}>
                      {getString("hour", timeStr)} - {gig.adress} {gig.city}
                    </Text>
                  </Stack>
                </Box>
              </Collapsible.Content>
            </Collapsible.Root>
          </Table.Cell>
        </Table.Row>
      </>
  );
};

const GigTable = ({ list, isPast }: { list: Gig[]; isPast: boolean }) => {
  return (
      <Box borderRadius="0.75rem" borderWidth="2px" borderColor={colors.border} overflow="hidden" bg={colors.accentwhite}>
        <Table.Root size="md" variant="line" interactive tableLayout="fixed">
          <Table.Body>
            {list.map((gig) => (
                <GigRow key={gig.id} gig={gig} isPast={isPast} />
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
  );
};

export default function Live() {
  const { getString } = useTranslation();
  const now = Date.now() / 1000;
  const upcomingGigs = gigs.filter((g) => g.time >= now).sort((a, b) => a.time - b.time);
  const pastGigs = gigs.filter((g) => g.time < now).sort((a, b) => b.time - a.time);

  return (
      <Container maxW={{ base: "100%", md: "60rem" }} py="2rem">
        <Tabs.Root defaultValue="upcoming" variant="line" css={{"--tabs-indicator-bg": `${colors.beige}`}}>
          <Tabs.List borderBottomWidth="2px" borderBottomColor={colors.border}>
            <Tabs.Trigger value="upcoming" fontSize="lg" fontWeight="bold" color={colors.text} _selected={{ bg: colors.beige }}>
              {getString("upcoming_gigs")}
            </Tabs.Trigger>
            <Tabs.Trigger value="past" fontSize="lg" fontWeight="bold" color={colors.text} _selected={{ bg: colors.beige }}>
              {getString("past_gigs")}
            </Tabs.Trigger>
            <Tabs.Indicator/>
          </Tabs.List>

          <Tabs.Content value="upcoming">
            <GigTable list={upcomingGigs} isPast={false} />
          </Tabs.Content>
          <Tabs.Content value="past">
            <GigTable list={pastGigs} isPast={true} />
          </Tabs.Content>
        </Tabs.Root>
      </Container>
  );
}
