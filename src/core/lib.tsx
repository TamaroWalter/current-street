import { SiSpotify, SiInstagram, SiYoutube, SiApple, SiGmail, SiGooglemaps, SiGooglecalendar, SiGithub } from 'react-icons/si'
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { type ReactElement } from 'react';
import { LuArrowLeft, LuArrowRight, LuChevronDown, LuTicket, LuCalendarPlus, LuX} from "react-icons/lu"
import { SlMenu } from "react-icons/sl";

export function getIcon(iconName: keyof typeof iconMap): ReactElement | null {
  const Icon = iconMap[iconName];
  if (!Icon) return null;
  return <Icon />;
}

export const iconMap = {
  spotify: SiSpotify,
  instagram: SiInstagram,
  gmail: SiGmail,
  youtube: SiYoutube,
  apple: SiApple,
  googlemaps: SiGooglemaps,
  github: SiGithub,
  arrowleft: LuArrowLeft,
  arrowright: LuArrowRight,
  chevrondown: LuChevronDown,
  ticket: LuTicket,
  calendarsave: LuCalendarPlus,
  googlecalendar: SiGooglecalendar,
  outlook: PiMicrosoftOutlookLogoFill,
  menu: SlMenu,
  close: LuX,
} as const;

