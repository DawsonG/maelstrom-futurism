import { ReactNode } from 'react';
import { SerializedStyles } from '@emotion/react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'cancel'
  | 'ghost'
  | 'link';
export type ButtonType = 'button' | 'submit';
export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  children?: ReactNode;

  /**
   * Either type='submit' or type='button'
   */
  type?: ButtonType;

  /**
   * Allow the user to pass in custom styles
   */
  css?: SerializedStyles | SerializedStyles[];

  size?: Sizes;
  variant?: ButtonVariant;
  outline?: boolean;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}