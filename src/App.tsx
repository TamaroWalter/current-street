// Imports from react and UI library.
import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation} from 'react-router-dom';
import { Button, Flex, Box, Text,  Container, HStack, Link as ChakraLink, Icon, Stack} from '@chakra-ui/react';

// Import core.
import { getIcon, getString } from './core/lib';
import { useLanguage } from './core/LanguageContext';
// Import components styling.
import './App.css';

// Import other components.
import Home from './components/Home';
import About from './components/About';
import Live from './components/Live';

// Import data.
import navigation from './data/navigation.json';
import social from './data/social.json';

/**
 * Builds the content of the website.
 * @returns 
 */
export default function App() {
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
        <Flex gap="2" className="header-navigation">
          {navigation.map(({route, text}) => (
            <Button backgroundColor={(route == location.pathname) ? '#a1aaaa' : '#f4f4f5'}>
              <Link className="navigation-item" to={route} >{getString(text)}</Link>
            </Button>
            ))}
        </Flex>
      </Container>
    </Box>
  );
}

function AppFooter() {
  const { language, setLanguage } = useLanguage();
  return (
    <Container as="footer" className="footer" >
      <Stack gap="6">
        <Stack direction="row" justify="space-between" align="center">
          <HStack gap="4">
            {social.map(({ i, href, icon }) => (
              <ChakraLink className="footer-social" key={i} href={href} colorPalette="gray" target="_blank" rel="noopener noreferrer">
                <Icon size="lg">{getIcon(icon)}</Icon>
              </ChakraLink>
            ))}
          </HStack>
          <Button variant="plain" className="footer-togglelang" onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}>
            {getString("lang_toggle")}
          </Button>
        </Stack>
        <Flex align="center" justify="center" width="100%">
          <Text className="footer_copyright">
            © {new Date().getFullYear()} {getString("copyright")}
          </Text>
        </Flex>
      </Stack>
    </Container>
  );
}
