import { ReactNode } from "react";
import { SerializedStyles } from "@emotion/react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "cancel"
  | "ghost"
  | "link";
export type ButtonType = "button" | "submit";
export type Scale = "small" | "normal" | "big";

export interface ButtonProps {
  children?: ReactNode;

  /**
   * Either type="submit" or type="button"
   */
  type?: ButtonType;

  /**
   * Allow the user to pass in custom styles
   */
  css?: SerializedStyles | SerializedStyles[];

  scale?: Scale;
  variant?: ButtonVariant;
  outline?: boolean;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}