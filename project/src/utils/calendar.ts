// Calendar integration utilities
export function addToCalendar(event: {
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string;
}) {
  const { title, startTime, endTime, description } = event;
  
  // Generate Google Calendar URL
  const googleUrl = new URL('https://calendar.google.com/calendar/render');
  googleUrl.searchParams.append('action', 'TEMPLATE');
  googleUrl.searchParams.append('text', title);
  googleUrl.searchParams.append('dates', 
    `${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z` +
    '/' +
    `${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`
  );
  if (description) {
    googleUrl.searchParams.append('details', description);
  }
  
  window.open(googleUrl.toString(), '_blank');
}