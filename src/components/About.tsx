import type { IconButtonProps } from "@chakra-ui/react"
import { Flex, Stack, AspectRatio, Box, Carousel, Container, IconButton, Image, Text, Card } from "@chakra-ui/react"
import { forwardRef } from "react"
import { getIcon } from '../core/lib';
import { colors } from "../core/theme";
import { useTranslation } from '../core/LanguageContext';
import photos from "../data/photos.json";
import members from "../data/members.json";

export default function About() {
  const { getString } = useTranslation();
  return (
    <Container>
      <Flex align="left">
        <Text fontSize="3xl" fontWeight="bold">{getString("the_band")}</Text>
      </Flex>
      <Stack direction="column" gap="8">
        <Stack direction={{ base: "column", md: "row" }}>
          <SlideShow/>
          <BandDescription/>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          justify={{ base: "stretch", md: "flex-start" }}
          overflowX={{ base: "visible", md: "auto" }}
          overflowY="hidden"
          flexWrap="nowrap"
        >
          {
            members.map((member) => (
              <MemberCard
                key={member.id}
                id={member.id}
                name={member.name}
                instruments={member.instruments}
                desc={member.desc}
                photo_id={member.photo_id}
              />
            )
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

const SlideShow = () => {
  return (
    <Carousel.Root slideCount={photos.length} w="100%" mx="auto">
      <Carousel.ItemGroup pointerEvents={{ base: "auto", md: "none" }}>
        {photos.map((photo, index) => (
          <Carousel.Item key={photo.id} index={index}>
            <AspectRatio ratio={16 / 9} maxH="60vh" w="full">
              <Box display="flex" alignItems="center" justifyContent="center">
                <Image
                  src={photo.source}
                  alt={photo.alt}
                  objectFit="cover"
                  maxH="100%"
                  maxW="100%"
                />
              </Box>
            </AspectRatio>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control justifyContent="center" gap="4">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost">
            {getIcon('arrowleft')}
          </IconButton>
        </Carousel.PrevTrigger>

        <Carousel.Indicators />

        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost">
            {getIcon('arrowright')}
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  );

}

const BandDescription = () => {
  const { getString } = useTranslation();
  return (
    <Text maxW={{base: "100%", md: "50%"}} mx={{base: "10px", md: "2.5rem"}} alignContent="center"bg={colors.accentgreen}>
      {getString("currentstreet_description")}
    </Text>
  );
}

const MemberCard = ({id, name, instruments, desc, photo_id} : Member) => {
  const {getString} = useTranslation();
  const photo = photos.find(e => e.id == photo_id);
  return (
    <Card.Root maxH="35rem" minW="xs" maxW="xs" overflow="hidden" flexShrink={0}>
      <Image
        src={photo?.source}
        alt={photo?.alt}
      />
      <Card.Body gap="2">
        <Card.Title>
          <Text color={colors.text}>
            {name} - {instruments.map((instrument) => getString(instrument)).join(", ")}
          </Text>
        </Card.Title>
        <Card.Description>
          <Text color={colors.text}>{desc}</Text>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  )
}

interface Member {
  id: number;
  name: string;
  instruments: string[];
  desc: string;
  photo_id: number;
}

