import { SiSpotify, SiInstagram, SiYoutube, SiApple, SiGmail, SiGooglemaps, SiGithub } from 'react-icons/si'
import { useLanguage } from './LanguageContext';
import en from '../data/lang/en.json';
import de from '../data/lang/de.json';
import { LuArrowLeft, LuArrowRight, LuChevronDown, LuTicket, LuCalendarPlus} from "react-icons/lu"

export function getIcon(iconName: string): JSX.Element | null {
  switch (iconName) {
    case 'spotify': return <SiSpotify/>;
    case 'instagram': return <SiInstagram/>;
    case 'gmail': return <SiGmail/>;
    case 'youtube': return <SiYoutube/>;
    case 'apple': return <SiApple/>;
    case 'googlemaps': return <SiGooglemaps/>
    case 'github': return <SiGithub/>
    case 'arrowleft': return <LuArrowLeft/>
    case 'arrowright': return <LuArrowRight/>
    case 'chevrondown': return <LuChevronDown/>
    case 'ticket': return <LuTicket/>
    case 'calendarsave': return <LuCalendarPlus/>
    default: return null;
  }
};

export function getString(identifier: string): string {
  const { language } = useLanguage();
  const dict = (language === 'de' ? de : en) as Record<string, string>;
  return dict[identifier] ?? "";
}

export function downloadICS(name: string, time: number, address: string, description?: string, ticketUrl?: string): void {
  const date = new Date(time * 1000);
  const startTime = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const endDate = new Date((time + 7200) * 1000);
  const endTime = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  // Update the description.
  description = ticketUrl ? `${description}\n\nTickets: ${ticketUrl}` : description;

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Current Street//Events//EN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${name}-${time}@current-street.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:Current Street - ${name}
LOCATION:${address}
DESCRIPTION:${description || ''}
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `CurrentStreet-${name}.ics`;
  link.click();
  URL.revokeObjectURL(link.href);
}