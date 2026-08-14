export type DateBound = 'today' | string;

export type DisabledDay = 'weekends' | string;

export interface BusinessHours {
  start: string;
  end: string;
}

const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const todayIso = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const resolveDateBound = (bound: DateBound | undefined): string | undefined => {
  if (!bound) return undefined;
  return bound === 'today' ? todayIso() : bound;
};

export const isDateDisabled = (value: string, disabledDays: DisabledDay[] | undefined): boolean => {
  if (!disabledDays || disabledDays.length === 0 || !value) return false;

  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return false;
  const date = new Date(year, month - 1, day);
  const dayName = DAY_NAMES[date.getDay()];
  const isWeekend = dayName === 'saturday' || dayName === 'sunday';

  return disabledDays.some((rule) => {
    const normalized = rule.toLowerCase();
    if (normalized === 'weekends') return isWeekend;
    if (DAY_NAMES.includes(normalized)) return normalized === dayName;
    return rule === value;
  });
};

const toMinutes = (time: string): number | null => {
  const [h, m] = time.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
};

const toTimeString = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

export const snapToBusinessHours = (value: string, hours: BusinessHours | undefined): string => {
  if (!hours || !value) return value;

  const valueMinutes = toMinutes(value);
  const startMinutes = toMinutes(hours.start);
  const endMinutes = toMinutes(hours.end);
  if (valueMinutes === null || startMinutes === null || endMinutes === null) return value;

  if (valueMinutes < startMinutes) return toTimeString(startMinutes);
  if (valueMinutes > endMinutes) return toTimeString(endMinutes);
  return value;
};
