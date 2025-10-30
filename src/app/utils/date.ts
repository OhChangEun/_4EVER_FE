// 분 → x시 y분
export const formatMinutesToHourMin = (minutes: number) => {
  if (minutes == null) return '-';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}시 ${m}분`;
};

// ISO → HH:mm
export const formatTime = (isoString: string) => {
  if (!isoString) return '-';
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
