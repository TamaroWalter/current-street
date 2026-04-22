import { SiSpotify, SiInstagram, SiYoutube, SiApple, SiGmail, SiGooglemaps, SiGooglecalendar, SiGithub } from 'react-icons/si'
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { LuArrowLeft, LuArrowRight, LuChevronDown, LuTicket, LuCalendarPlus, LuX} from "react-icons/lu"
import { SlMenu } from "react-icons/sl";

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

export const colors = {
  bg: "#4a6660",
  accentgreen: "#a1aaaa",
  accentwhite: "#f4f4f5",
  hover: "#ca6164",
  text: "#1C1C1E",
  border: "#1C1C1E",
} as const;
