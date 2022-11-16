function getShortDate(date: Date): string {
  const locale = Boolean(navigator.language) ? navigator.language : 'en-US';
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default getShortDate;
