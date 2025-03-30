export const formatRelativeTime = (createdAt: string) => {
  const now = new Date().valueOf();
  const postDate = new Date(createdAt).valueOf();
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const units = [
    { unit: "year", value: 60 * 60 * 24 * 365 },
    { unit: "month", value: 60 * 60 * 24 * 30 },
    { unit: "day", value: 60 * 60 * 24 },
    { unit: "hour", value: 60 * 60 },
    { unit: "minute", value: 60 },
    { unit: "second", value: 1 },
  ];

  for (const { unit, value } of units) {
    const diff = Math.floor(diffInSeconds / value);
    if (Math.abs(diff) >= 1) {
      return formatter.format(diff, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return "just now";
};