import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate} from 'react-router-dom';
import { Button, Flex, Box, Text,  Container, HStack, Link as ChakraLink, Icon, Stack, Drawer, IconButton, Portal, Spacer, VStack} from '@chakra-ui/react';
import { useState } from 'react';
import { getIcon } from './core/lib';
import { iconMap, colors } from './core/theme';
import { useLanguage, useTranslation } from './core/LanguageContext';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Live from './components/Live';
import navigation from './data/navigation.json';
import social from './data/social.json';

/**
 * Builds the content of the website.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Box className="app-container">
        <AppHeader/>
          <Box className="main-scroll">
            <Box as="main" minH="100%" h="100%" p="1rem">
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

const AppHeader = () => {
  return (
    <Box as="header" px="0.75rem" py="0.66rem" bg={colors.bg_dark_lighter}>
      <Box display={{ base: "flex", md: "none" }}>
        <MobileNav/>
      </Box>
      <Box display={{ base: "none", md: "flex" }}>
        <DesktopNav />
      </Box>
    </Box>
  );
}

const MobileNav = () => {
  const { language, setLanguage } = useLanguage();
  const { getString } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <HStack h="100%" w="100%" justifyContent="space-between">
      <Text textTransform="uppercase" pt="1" fontWeight="bold" fontSize="2xl" h="100%">
        {getString("band_name")}
      </Text>
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

const DesktopNav = () => {
  const { getString } = useTranslation();
  const location = useLocation();
  return (
    <Container className="header-child">
      <Flex align="center" w="100%">
        <Box bg={colors.bg_dark} borderRadius="xl" p="1" border="1px solid" borderColor={colors.accentgreen}>
          <HStack gap="1">
            {navigation.map(({ route, text }) => (
              <Button
                key={route}
                borderRadius="lg"
                size="sm"
                variant="ghost"
                _hover={{ bg: colors.accentgreen, color: colors.text }}
                bg={route === location.pathname ? colors.accentgreen : "transparent"}
                color={route === location.pathname ? colors.text : colors.accentwhite}
                asChild
              >
                <Link className="navigation-item" to={route}>{getString(text)}</Link>
              </Button>
            ))}
          </HStack>
        </Box>
      </Flex>
    </Container>
  );
}

const AppFooter = () => {
  const { getString } = useTranslation();
  const { language, setLanguage } = useLanguage();
  return (
      <Container as="footer" py={{ base: '2', md: '3' }}>
        <Stack gap="1">
          <Stack display={{ base: "none", md: "flex" }} direction="row" justify="space-between" align="center">
            <HStack gap="4">
              {social.map(({ i, href, icon }) => (
                  <ChakraLink className="footer-social" key={i} href={href} colorPalette="gray" target="_blank" rel="noopener noreferrer">
                    <Icon size="lg">{getIcon(icon as keyof typeof iconMap)}</Icon>
                  </ChakraLink>
              ))}
            </HStack>
            <Button variant="plain" className="footer-togglelang"
                onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}>
              {getString("lang_toggle")}
            </Button>
          </Stack>
          <Text className="footer_copyright">
            © {new Date().getFullYear()} {getString("copyright")}
          </Text>
        </Stack>
      </Container>
  );
}
