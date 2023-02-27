export const getTimeDiffString = pastTime => {
  const now = new Date();
  const past = new Date(pastTime);
  const diffMs = now.getTime() - past.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffYears > 0) return `${diffYears} years`;
  if (diffMonths > 0) return `${diffMonths} months`;
  if (diffDays > 0) return `${diffDays} days`;
  if (diffHours > 0) return `${diffHours} hours ago`;
  if (diffMinutes > 0) return `${diffMinutes} min ago`;
  return '1 min ago';
};
