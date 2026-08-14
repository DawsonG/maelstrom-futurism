export type ValidityStateKey = Exclude<keyof ValidityState, 'valid' | 'customError'>;

export type ErrorMessages = Partial<Record<ValidityStateKey, string>>;

const VALIDITY_KEYS: ValidityStateKey[] = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooLong',
  'tooShort',
  'rangeUnderflow',
  'rangeOverflow',
  'stepMismatch',
  'badInput',
];

export const applyCustomValidity = (
  el: HTMLInputElement | HTMLTextAreaElement,
  errorMessages: ErrorMessages | undefined,
): boolean => {
  if (!errorMessages) return false;

  const failingKey = VALIDITY_KEYS.find((key) => el.validity[key]);
  const message = failingKey ? errorMessages[failingKey] : undefined;

  el.setCustomValidity(message ?? '');
  return !!message;
};

const extractHost = (rawValue: string, type: string | undefined): string | null => {
  if (!rawValue) return null;

  if (type === 'email') {
    const at = rawValue.lastIndexOf('@');
    return at === -1 ? null : rawValue.slice(at + 1).toLowerCase();
  }

  try {
    return new URL(rawValue).hostname.toLowerCase();
  } catch {
    return null;
  }
};

const isAllowedHost = (host: string, allowedDomains: string[]): boolean => allowedDomains.some((domain) => {
  const normalized = domain.toLowerCase();
  return host === normalized || host.endsWith(`.${normalized}`);
});

export const applyAllowedDomains = (
  el: HTMLInputElement,
  type: string | undefined,
  allowedDomains: string[] | undefined,
  message: string,
): void => {
  if (!allowedDomains || allowedDomains.length === 0) return;

  const host = extractHost(el.value, type);
  const disallowed = !!host && !isAllowedHost(host, allowedDomains);

  el.setCustomValidity(disallowed ? message : '');
};

export const DEFAULT_TEL_MASK = '(000) 000-0000';

export const applyMask = (rawValue: string, mask: string): string => {
  const digits = rawValue.replace(/\D/g, '');
  let result = '';
  let digitIndex = 0;

  for (let i = 0; i < mask.length && digitIndex < digits.length; i += 1) {
    if (mask[i] === '0') {
      result += digits[digitIndex];
      digitIndex += 1;
    } else {
      result += mask[i];
    }
  }

  return result;
};
