import {Text, Flex, Stack} from "@chakra-ui/react";
import './Live.css';
export default function Live() {
    return (
      <Stack>
        <Flex align="left">
          <Text fontWeight="bold">UPCOMING GIGS:</Text>
        </Flex>
        <Stack className="live-dates">
        </Stack>
      </Stack>
    )
}



// Objects.

/*
const dates = [
  { id: '1', date: '24.10.2025', time: '20:30', city: 'Münster', adress: 'Kreuzstraße 37/38, 48143', location: '51.965844, 7.621663' },
  { id: '2', date: '07.11.2025', time: '19:00', city: 'Osnabrück', adress: 'Klöntrupstraße 6, 49082', location: '52.266123, 8.057715' },
]*/