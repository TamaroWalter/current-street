import { SiSpotify, SiInstagram, SiYoutube, SiApple, SiGmail, SiGooglemaps } from 'react-icons/si'
import { useLanguage } from './LanguageContext';
import en from '../data/lang/en.json';
import de from '../data/lang/de.json';

export function getIcon(iconName: string): JSX.Element | null {
  switch (iconName) {
    case 'spotify': return <SiSpotify />;
    case 'instagram': return <SiInstagram />;
    case 'gmail': return <SiGmail />;
    case 'youtube': return <SiYoutube />;
    case 'apple': return <SiApple />;
    case 'googlemaps': return <SiGooglemaps />
    default: return null;
  }
};

export function getString(identifier: string): string {
  const { language } = useLanguage();
  const dict = (language === 'de' ? de : en) as Record<string, string>;
  return dict[identifier] ?? "";
}