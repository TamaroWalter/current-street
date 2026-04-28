// Imports from react and UI library.
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate} from 'react-router-dom';
import { Button, Flex, Box, Text,  Container, HStack, Link as ChakraLink, Icon, Stack, Drawer, IconButton, Portal, Spacer, VStack} from '@chakra-ui/react';
import { useState } from 'react';
// Import core.
import { getIcon } from './core/lib';
import { iconMap, colors } from './core/theme';
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
    <Box as="header" className="header" pt={{ base: "1.2rem", md:"0" }} bg="rgba(50, 70, 65, .4)">
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
            <Drawer.Content bg={colors.bg}
              _closed={{ animationDuration: "0.4s", animationTimingFunction: "ease-in"}}
              _open={{animationDuration: "0.5s",}}
            >
              <Drawer.Header mt="0.2rem">
                <Drawer.Title>
                  <Text pt="1" color={colors.text} fontWeight="bold" fontSize="2xl">CURRENT STREET</Text>
                </Drawer.Title>
              </Drawer.Header>
              <Drawer.Body display="flex" flexDirection="column" h="100%">
                <VStack pt="2rem">
                  {navigation.map(({route, text}) => (
                    <Button
                    borderRadius="xl" borderWidth="2px" borderColor={colors.text}
                    w="100%"
                    size="2xl"
                    _active={{ transform: 'scale(0.95)', opacity: 0.4, bg: colors.accentgreen }}
                    _hover={{bg: colors.accentgreen}}
                    backgroundColor={(route == location.pathname) ? colors.accentgreen : colors.accentwhite}
                    onClick={() => {
                      setOpen(false);
                      navigate(route);
                    }}>
                      <Text m="0" pt="-1" pb="-1" className="navigation-item">{getString(text)}</Text>
                    </Button>
                  ))}
                </VStack>
                <Spacer/>
                <VStack bg={colors.accentgreen} borderRadius="2xl" borderColor={colors.border} borderWidth="2px">
                  <Text pt="1.2rem" pb="0.2rem" fontSize="lg" fontWeight="bold" color={colors.text}>{getString('social_media')}</Text>
                  <Spacer/>
                  <HStack pt="0.2rem" pb="1.2rem" gap="4" >
                  {social.filter(({icon}) => ['instagram', 'youtube', 'spotify', 'apple'].includes(icon)).map(({ i, href, icon }) => (
                    <ChakraLink className="footer-social" key={i} href={href} target="_blank" rel="noopener noreferrer">
                      <Icon size="xl" color="">{getIcon(icon as keyof typeof iconMap)}</Icon>
                    </ChakraLink>
                  ))}
                </HStack>
                </VStack>
              </Drawer.Body>
              <Drawer.Footer>
                <Button size="xl" borderWidth="2px" variant="plain" className="footer-togglelang" onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}>
                  {getString("lang_toggle")}
                </Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <Icon size="2xl" me="1rem" pe="auto" cursor="pointer" mt="1rem" color={colors.text}>
                  {getIcon('close')}
                </Icon>
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
          <Button backgroundColor={(route == location.pathname) ? colors.accentgreen : colors.accentwhite} asChild>
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
    <Container as="footer" className="footer" display={{base: "none", md: "block"}}>
      <Stack direction="row" justify="space-between" align="center">
        <HStack gap="4">
          {social.map(({ i, href, icon }) => (
            <ChakraLink className="footer-social" key={i} href={href} colorPalette="gray" target="_blank" rel="noopener noreferrer">
              <Icon size="lg">{getIcon(icon as keyof typeof iconMap)}</Icon>
            </ChakraLink>
          ))}
        </HStack>
        <Flex align="center" justify="center" width="100%">
          <Text className="footer_copyright">
            © {new Date().getFullYear()} {getString("copyright")}
          </Text>
        </Flex>
        <Button
          display={{ base: "none", md: "block" }}
          variant="plain"
          className="footer-togglelang"
          onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
        >
          {getString("lang_toggle")}
        </Button>
      </Stack>
    </Container>
  );
}
