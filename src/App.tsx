// Imports from react and UI library.
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate} from 'react-router-dom';
import { Button, Flex, Box, Text,  Container, HStack, Link as ChakraLink, Icon, Stack, Drawer, IconButton, Portal, CloseButton, Image, VStack} from '@chakra-ui/react';
import { useState } from 'react';
// Import core.
import { getIcon, iconMap } from './core/lib';
import { useLanguage, useTranslation } from './core/LanguageContext';
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
          <Box className="main-scroll">
            <Box as="main" className="main-content">
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/live" element={<Live/>} />
              </Routes>
            </Box>
          </Box>
        <AppFooter/>
      </Box>
    </BrowserRouter>
  );
}

function AppHeader() {
  return (
    <Box as="header" className="header" mt="1rem">
      <Box display={{ base: "flex", md: "none" }}>
        <MobileNav/>
      </Box>
      <Box display={{ base: "none", md: "flex" }}>
        <DesktopNav />
      </Box>
    </Box>
  );
}

function MobileNav() {
  const { language, setLanguage } = useLanguage();
  const { getString } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <HStack h="100%" w="100%" justifyContent="space-between">
      <Text pt="1" fontWeight="bold" fontSize="2xl" h="100%">CURRENT STREET</Text>
      <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="top" size="full">
        <Drawer.Trigger asChild>
          <IconButton> {getIcon('menu')} </IconButton>
        </Drawer.Trigger>  
        <Portal>
          <Drawer.Backdrop/>
          <Drawer.Positioner>
            <Drawer.Content bg="#4a6660" color="#f4f4f5"
              _closed={{ animationDuration: "0.4s", animationTimingFunction: "ease-in"}}
              _open={{animationDuration: "0.5s",}}
            >
              <Drawer.Header/>
              <Drawer.Body display="flex" justifyContent="center" alignItems="center" h="100%">
                <VStack h="100%">
                  {navigation.map(({route, text}) => (
                    <Button
                    w="100%"
                    size="2xl"
                    _active={{ transform: 'scale(0.95)', opacity: 0.4, bg: '#a1aaaa' }}
                    _hover={{bg: '#a1aaaa'}}
                    backgroundColor={(route == location.pathname) ? '#a1aaaa' : '#f4f4f5'}
                    onClick={() => {
                      setOpen(false);
                      navigate(route);
                    }}>
                      <Text m="0" pt="-1" pb="-1" className="navigation-item">{getString(text)}</Text>
                    </Button>
                  ))}
                </VStack>
              </Drawer.Body>
              <Drawer.Footer>
                <Button size="xl" variant="plain" className="footer-togglelang" onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}>
                  {getString("lang_toggle")}
                </Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="2xl" />
              </Drawer.CloseTrigger>  
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
        </Drawer.Root>
    </HStack>
  );
}

function DesktopNav() {
  const { getString } = useTranslation();
  const location = useLocation();
  return (
    <Container className="header-child">
      <Flex gap="2" className="background-box">
        {navigation.map(({route, text}) => (
          <Button backgroundColor={(route == location.pathname) ? '#a1aaaa' : '#f4f4f5'} asChild>
            <Link className="navigation-item" to={route} >{getString(text)}</Link>
          </Button>
          ))}
      </Flex>
    </Container>
  );
}

function AppFooter() {
  const { getString } = useTranslation(); 
  const { language, setLanguage } = useLanguage();
  return (
    <Container as="footer" className="footer" >
      <Stack gap="6">
        <Stack direction="row" justify="space-between" align="center">
          <HStack gap="4">
            {social.map(({ i, href, icon }) => (
              <ChakraLink className="footer-social" key={i} href={href} colorPalette="gray" target="_blank" rel="noopener noreferrer">
                <Icon size="lg">{getIcon(icon as keyof typeof iconMap)}</Icon>
              </ChakraLink>
            ))}
          </HStack>
          <Button
            display={{ base: "none", md: "block" }}
            variant="plain"
            className="footer-togglelang"
            onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
          >
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
