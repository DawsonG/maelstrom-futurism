import React, { useRef, useState } from 'react';

import { otpCell, otpContainer } from './styles';

export interface OtpInputProps {
  /** A unique (in form) field name (Required). Submitted as a single
   *  concatenated string via a hidden input. */
  name: string;

  /** Number of single-character cells to render. Defaults to 6. */
  length?: number;

  /** The current code (controlled). */
  value?: string;

  /** The initial code (uncontrolled). */
  defaultValue?: string;

  /** Called with the full code string whenever any cell changes. */
  onChange?: (value: string) => void;

  /** Called with the full code string once every cell is filled. */
  onComplete?: (value: string) => void;

  disabled?: boolean;
  autoFocus?: boolean;
}

const isDigit = (char: string) => /^[0-9]$/.test(char);

const OtpInput = ({
  name, length = 6, value, defaultValue, onChange, onComplete, disabled, autoFocus,
}: OtpInputProps): React.ReactNode => {
  const isControlled = value !== undefined;
  const [uncontrolledDigits, setUncontrolledDigits] = useState<string[]>(
    () => Array.from({ length }, (_, i) => defaultValue?.[i] ?? ''),
  );
  const digits = isControlled
    ? Array.from({ length }, (_, i) => value[i] ?? '')
    : uncontrolledDigits;

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const setDigits = (next: string[]) => {
    if (!isControlled) setUncontrolledDigits(next);

    const joined = next.join('');
    onChange?.(joined);
    if (joined.length === length && next.every((d) => d !== '')) {
      onComplete?.(joined);
    }
  };

  const handleChange = (index: number, raw: string) => {
    const char = raw.slice(-1);
    if (char && !isDigit(char)) return;

    const next = [...digits];
    next[index] = char;
    setDigits(next);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      e.preventDefault();
      const next = [...digits];
      next[index - 1] = '';
      setDigits(next);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!pasted) return;
    e.preventDefault();

    const next = [...digits];
    let cursor = index;
    for (const char of pasted) {
      if (cursor >= length) break;
      next[cursor] = char;
      cursor += 1;
    }
    setDigits(next);

    const focusIndex = Math.min(cursor, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div css={otpContainer}>
      <input type="hidden" name={name} value={digits.join('')} />
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          css={otpCell}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={digit}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          aria-label={`Digit ${index + 1} of ${length}`}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
