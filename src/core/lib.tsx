import { SiSpotify, SiInstagram, SiYoutube, SiApple, SiGmail, SiGooglemaps, SiGooglecalendar, SiGithub } from 'react-icons/si'
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
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
    case 'googlecalendar': return <SiGooglecalendar/>
    case 'outlook': return <PiMicrosoftOutlookLogoFill/>
    default: return null;
  }
};

/**
 * Method to get a String independent of the language.
 * @param identifier 
 * @param params accepts multiple parameters
 * @returns 
 */
export function getString(identifier: string, ...params: string[]): string {
  const { language } = useLanguage();
  const dict = (language === 'de' ? de : en) as Record<string, string>;
  let str = dict[identifier] ?? "";
  
  params.forEach((param, index) => {str = str.replace(`{${index}}`, param);});
  
  return str;
}

export function downloadICS(name: string, time: number, address: string, description?: string, ticketUrl?: string): void {
  const start = new Date(time * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = new Date((time + 7200) * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const desc = ticketUrl ? `${description}\n\nTickets: ${ticketUrl}` : description;

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Current Street//Events//EN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${name}-${time}@current-street.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${start}
DTEND:${end}
SUMMARY:Current Street - ${name}
LOCATION:${address}
DESCRIPTION:${desc || ''}
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `CurrentStreet-${name}.ics`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function getGoogleCalendarUrl(name: string, time: number, address: string, description?: string, ticketUrl?: string): string {
  const start = new Date(time * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = new Date((time + 7200) * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const desc = ticketUrl ? `${description ?? ''}\n\nTickets: ${ticketUrl}` : (description ?? '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Current Street - ${name}`,
    dates: `${start}/${end}`,
    details: desc,
    location: address,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getOutlookCalendarUrl(name: string, time: number, address: string, description?: string, ticketUrl?: string): string {
  const start = new Date(time * 1000).toISOString();
  const end = new Date((time + 7200) * 1000).toISOString();
  const desc = ticketUrl ? `${description ?? ''}\n\nTickets: ${ticketUrl}` : (description ?? '');
  const params = new URLSearchParams({
    subject: `Current Street - ${name}`,
    startdt: start,
    enddt: end,
    body: desc,
    location: address,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}