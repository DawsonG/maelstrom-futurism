import { ButtonHTMLAttributes, ReactNode } from 'react';
import { StyleOverride } from '@maelstrom-futurism/core';

export type ButtonVariant
  = | 'primary'
    | 'secondary'
    | 'cancel'
    | 'ghost'
    | 'link'
    | 'outline';
export type ButtonType = 'button' | 'submit';
export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children?: ReactNode;

  /** Either type='submit' or type='button' */
  type?: ButtonType;

  /** Style override — accepts Emotion SerializedStyles (composed with the
   *  button's base class) or plain CSSProperties (applied inline). */
  styles?: StyleOverride;

  size?: Sizes;
  variant?: ButtonVariant;
  outline?: boolean;
}
