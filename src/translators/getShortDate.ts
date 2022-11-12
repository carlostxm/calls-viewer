function getShortDate(date: Date): string {
  const locale = navigator.language ?? 'en-US';
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default getShortDate;
