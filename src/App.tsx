import { BrowserRouter, Routes, Route, Link, useLocation} from 'react-router-dom';
import { Button, Flex, Box, Text,  Container, HStack, Link as ChakraLink, Icon, Stack} from '@chakra-ui/react';
import { SiSpotify, SiInstagram, SiYoutube, SiApple, SiGmail } from 'react-icons/si'
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Live from './components/Live';
import navigation from './data/navigation.json';

function App() {
  return (
    <BrowserRouter>
      <Box className="app-container">
        <AppHeader/>

        <Container as="main" className="main-content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/live" element={<Live/>} />
          </Routes>
        </Container>

        <AppFooter/>
      </Box>
    </BrowserRouter>
  );
}

function AppHeader() {
  const location = useLocation();
  return (
    <Box as="header" className="header">
      <Box className="header-child">
        <Text fontSize="36px" fontFamily={"impact"} fontWeight="bolder"> 
          Current Street
        </Text>
      </Box>
      <Container className="header-child">
        <Flex gap="4" className="header-navigation">
          {navigation.map(({route, text}) => (
            <Button backgroundColor={(route == location.pathname) ? '#a1aaaa' : '#f4f4f5'}>
              <Link className="navigation-item" to={route} >{text}</Link>
            </Button>
            ))}
        </Flex>
      </Container>
    </Box>
  );
}

function AppFooter() {
  return (
    <Container as="footer" className="footer" >
      <Stack gap="6">
        <Stack direction="row" justify="space-between" align="center">
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

export default App
