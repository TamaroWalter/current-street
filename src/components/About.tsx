import { Stack, VStack, Avatar, AspectRatio, Box, Carousel, Container, IconButton, Image, Text, Card } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { createPortal } from 'react-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { getIcon } from '../core/lib';
import { colors } from "../core/theme";
import { useTranslation } from '../core/LanguageContext';
import photos from "../data/photos.json";
import members from "../data/members.json";

export default function About() {
  const { getString } = useTranslation();
  return (
    <Container pb="1rem">
      <VStack gap="5">
        {/** Story card*/}
        <Card.Root w="100%" borderRadius="2xl">
          <Card.Body gap="2">
            <Card.Title>{getString("band_description_header")}</Card.Title>
            <Card.Description>
              <Text fontSize="md">{getString("band_description")}</Text>
            </Card.Description>
          </Card.Body>
        </Card.Root>

        {/** Photos*/}
        <Card.Root w="100%" borderRadius="2xl">
          <Card.Body gap="2">
            <Card.Title>{getString("photos")}</Card.Title>
            <Card.Description>
              <SlideShow/>
            </Card.Description>
          </Card.Body>
        </Card.Root>

        {/** The Band */}
        <Card.Root w="100%" borderRadius="2xl">
          <Card.Body gap="2">
            <Card.Title>{getString("the_band")}</Card.Title>
            <Card.Description ps="2rem" pe="2rem">
              <Stack direction={{base: "column", md: "row"}} w="100%" gap="4">
                {members.map((member) => (
                    <MemberCard
                      key={member.id}
                      id={member.id}
                      name={member.name}
                      instruments={member.instruments}
                      desc={member.desc}
                      photo_id={member.photo_id}
                    />
                ))}
              </Stack>
            </Card.Description>
          </Card.Body>
        </Card.Root>

        {/** Booking 
        <Card.Root w="100%" borderRadius="2xl">
          <Card.Body gap="2">
            <Card.Title>{getString("the_band")}</Card.Title>
            <Card.Description>
              E-mail form
            </Card.Description>
          </Card.Body>
        </Card.Root>
        */}
      </VStack>
    </Container>
  );
}

const SlideShow = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden'; // Setup.
    return () => {document.body.style.overflow = ''}; // Cleanup.
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return; 
    const handleKeyDown = (e: KeyboardEvent) => {if (e.key === 'Escape') setIsOpen(false);};
    window.addEventListener('keydown', handleKeyDown);
    return () => {window.removeEventListener('keydown', handleKeyDown)};
  }, [isOpen]);

  return (
    <>
    {/*render the carousel as default, that on click turns into an overlay. pointer cursor indicates that it's clickable*/}
    <PhotoCarousel onImageClick={() => setIsOpen(true)} />

    {/*Render the overlay as portal with the document body in the background when the state is open */}
    {isOpen && createPortal(
      <Box position="fixed" top="0" left="0" right="0" bottom="0" bg="blackAlpha.800"
        zIndex="9999" display="flex" alignItems="center" justifyContent="center" 
        onClick={() => setIsOpen(false)}>
        <Box w={{base: "100%", md:"70%"}}
            onClick={(e) => e.stopPropagation()}>
          <PhotoCarousel isZoomable/>
        </Box>
      </Box>,
      document.body
    )}
    </>
    
  );
}

const PhotoCarousel = ({ isZoomable = false, onImageClick}: PhotoCarouselProps) => {
  return (
    <Carousel.Root slideCount={photos.length} w="100%" mx="auto">
      <Carousel.ItemGroup>
        {photos.filter(photo => photo.name?.startsWith('bandfoto_')).map((photo, index) => (
          <Carousel.Item key={photo.id} index={index}>
            <AspectRatio ratio={16 / 9} maxH="60vh" w="full">
              {isZoomable ? (
                <Box w="100%" h="80vh" overflow="hidden" bg="black">
                  <TransformWrapper initialScale={1} minScale={1} maxScale={4} centerOnInit={true}>
                    <TransformComponent
                      wrapperStyle={{ width: '100%', height: '100%' }}
                      contentStyle={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Image src={photo.source} alt={photo.alt} maxH="100%" maxW="100%" objectFit="contain"/>
                    </TransformComponent>
                  </TransformWrapper>
                </Box>
              ) : (
                <AspectRatio ratio={16 / 9} maxH="60vh" w="full">
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Image src={photo.source} alt={photo.alt} objectFit="cover" maxH="100%" maxW="100%" cursor={onImageClick ? "pointer" : "default"}
                    onClick={onImageClick}/>
                  </Box>
                </AspectRatio>
              )}
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

const MemberCard = ({id, name, instruments, desc } : Member) => {
  const {getString} = useTranslation();
  return (
    <Card.Root key={id} w={{base: "100%", md: "20%"}} h={{base: "20%", md:"100%"}}>
      <Card.Body py="3" gap="4">
        <Card.Title w="100%" display="flex" justifyContent="center" alignItems="flex-end">
          <Avatar.Root bg={colors.accentgreen}>
            <Avatar.Image src="" />
            <Avatar.Fallback name={name}/>
          </Avatar.Root>
        </Card.Title>
        <Card.Description display="flex" justifyContent="center">
          <VStack>
            <Text color={colors.text} fontSize="sm" fontWeight="bold">{name}</Text>
            <Text color={colors.text} fontSize="xs">{instruments.map((instrument) => getString(instrument)).join(", ")}</Text>
            <Text color={colors.text} fontSize="xs">{desc}</Text>
          </VStack>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
}

interface Member {
  id: number;
  name: string;
  instruments: string[];
  desc: string;
  photo_id: number;
}

interface PhotoCarouselProps {
  isZoomable?: boolean;
   onImageClick?: () => void;
}
