
export type CalendarAction = 'ics' | 'google' | 'outlook';

export function getCalendarUrl(
  action: CalendarAction,
  name: string,
  time: number,
  address: string,
  description: string = '',
  ticketUrl: string = ''
): string | Blob {
  const start = new Date(time * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = new Date((time + 7200) * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const desc = ticketUrl ? `${description}\n\nTickets: ${ticketUrl}` : description;

  if (action === 'ics') {
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
DESCRIPTION:${desc}
END:VEVENT
END:VCALENDAR`;
    return new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  } else if (action === 'google') {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Current Street - ${name}`,
      dates: `${start}/${end}`,
      details: desc,
      location: address,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  } else {
    // outlook
    const params = new URLSearchParams({
      subject: `Current Street - ${name}`,
      startdt: new Date(time * 1000).toISOString(),
      enddt: new Date((time + 7200) * 1000).toISOString(),
      body: desc,
      location: address,
    });
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  }
}
