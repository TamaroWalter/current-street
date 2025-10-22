import {Container, Button, Text, Flex, Stack, VStack, Box} from "@chakra-ui/react";
import { SiGooglemaps } from "react-icons/si";
import './Live.css';

export default function Live() {
    return (
      <Stack>
        <Flex align="left">
          <Text fontSize="3xl" fontWeight="bold">UPCOMING GIGS:</Text>
        </Flex>
        <Container maxWidth="50rem">
          <Stack className="live-dates" gap="1rem">
            {gigs.map(({id, name, date, time, city, adress, location}) => (
              <Container key={id} className="live-gig" minHeight="3rem" maxWidth="50rem">
                <Stack height="100%" direction={{ base: "column", md: "row" }}>
                  <Box className="live-gig-info" height="100%" width={{base: "100%", md: "70%"}}>
                    <VStack>
                      <Flex alignItems="left" justify="center">
                        <Text fontSize="2xl" fontWeight="bold"> {date} - {time} - {name}</Text>
                      </Flex>
                      <Flex alignItems="left" justify="center">
                        <Text fontWeight="bold"> {adress} {city}</Text>
                      </Flex>
                    </VStack>
                  </Box>
                  <Flex padding="0.25rem" width={{base: "100%", md: "30%"}} align="center" justify="center">
                    <Button className="live-gig-maps" variant="surface" rounded="md" size="md" asChild>
                      <a href={`https://www.google.com/maps?q=${location}`} target="_blank" rel="noopener noreferrer">
                        Navigate <SiGooglemaps />
                      </a>
                    </Button>
                  </Flex>
                </Stack>
              </Container>
            ))}
          </Stack>
        </Container>
      </Stack>
    )
}



// Objects.


const gigs = [
  { id: '1', name: 'Cavete', date: '24.10.25', time: '20:30', city: 'Münster', adress: 'Kreuzstraße 37/38, 48143', location: '51.965844, 7.621663' },
  { id: '2', name: 'Rock im Rosenkiez', date: '07.11.25', time: '19:00', city: 'Osnabrück', adress: 'Klöntrupstraße 6, 49082', location: '52.266123, 8.057715' },
]