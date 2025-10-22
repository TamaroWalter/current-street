import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Grid, GridItem, Flex, Box, Text,  Container, HStack, Link as ChakraLink, Image, Icon, Stack} from '@chakra-ui/react';
import { SiSpotify, SiInstagram, SiYoutube, SiApple, SiGmail } from 'react-icons/si'
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Live from './components/Live';

function App() {
  return (
    <BrowserRouter>
      <Box className="app-container">

        <Grid as="header" className="header" templateRows="repeat(2, 1fr)" templateColumns="repeat(3, 1fr)">
          {<GridItem className="header-child" rowSpan={1} colSpan={3}>
            <Text fontSize="36px" fontFamily={"impact"} fontWeight="bolder"> 
              Current Street
            </Text>
          </GridItem>}
          <GridItem className="header-child" rowSpan={1} colSpan={1}>
            {/*<Image className="header-logo" src={logo} alt="logo"/>*/}
          </GridItem>
          <GridItem className="header-child" rowSpan={1} colSpan={1}>
            <Flex gap="4">
              {navigation.map(({route, text}) => (
                <ChakraLink asChild>
                  <Link className="navigation-item" to={route}>{text}</Link>
                </ChakraLink>
              ))}
            </Flex>
          </GridItem>
        </Grid>

        <Container as="main" className="main-content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/live" element={<Live/>} />
          </Routes>
        </Container>

        <Container as="footer" className="footer" >
          <Stack gap="6">
            <Stack direction="row" justify="space-between" align="center">
              {/*<Logo height="32" />*/}
              <HStack gap="4">
                {socialLinks.map(({ i, href, icon }) => (
                  <ChakraLink className="footer-social" key={i} href={href} colorPalette="gray">
                    <Icon size="lg">{icon}</Icon>
                  </ChakraLink>
                ))}
              </HStack>
            </Stack>
            <Flex align="center" justify="center" width="100%">
              <Text className="footer_copyright">
                © {new Date().getFullYear()} Current Street. All rights reserved.
              </Text>
            </Flex>
          </Stack>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

// Objects.

const socialLinks = [
  { i: 0, href: 'https://open.spotify.com/artist/4S3tOMrY2Xj9zhnmema3M3?si=6KI7qqPiTdiWFdrKN2yktg', icon: <SiSpotify /> },
  { i: 2, href: 'https://www.instagram.com/current_street/', icon: <SiInstagram /> },
  { i: 3, href: 'mailto:currentstreet21@gmail.com', icon: <SiGmail /> },
  { i: 4, href: 'https://www.youtube.com/@currentstreet', icon: <SiYoutube /> },
  { i: 5, href: 'https://music.apple.com/de/artist/current-street/1726848028', icon: <SiApple />  },
]

const navigation = [
  { route: '/', text: 'HOME'},
  { route: '/about', text: 'ABOUT'},
  { route: '/live', text: 'LIVE'},
]

export default App
