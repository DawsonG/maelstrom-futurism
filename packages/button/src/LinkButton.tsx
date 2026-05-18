import { ReactNode } from 'react';
import { css } from '@emotion/react';

const linkButtonStyles = css`
    border: 0;
    margin: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
    color: var(--mf-text);

    &:hover {
        color: var(--mf-link);
        text-decoration: underline;
    }
`;

interface LinkButtonProps {
  children?: ReactNode;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}

const LinkButton = ({
  children,
  onClick,
  disabled,
}: LinkButtonProps): ReactNode => (
  <button
    onClick={onClick}
    disabled={disabled}
    css={linkButtonStyles}
  >
    {children}
  </button>
);

export default LinkButton;
