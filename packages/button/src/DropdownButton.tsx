import { useEffect, useRef, useState } from "react";
import { Icon } from "@maelstrom-futurism/icons";
import { css as emotionCss, SerializedStyles } from "@emotion/react";

import Button from "./Button";
import { ButtonProps } from "./types";

interface DropdownButtonProps extends Omit<ButtonProps, "onClick"> {
    items?: Array<{
        label: string;
        onClick: () => void;
    }>;
}

const dropdownButtonStyles = emotionCss`
    position: relative;
    display: inline-block;
`;

const dropdownStyles = emotionCss`
    position: absolute;
    z-index: 10;
    margin-top: 2px;
    width: 98%;

    & button {
        border-radius: 0;
    }
    & button:first-of-type {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    & button:last-of-type {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
`;

const buttonStyles = emotionCss`
    display: block;
    width: 100%;
    padding: 10px;
    border: 0;
    text-align: left;
`;

const DropdownButton = (props: DropdownButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleRootClick = () => setIsOpen(!isOpen);

    const {
        children,
        css,
        items,
        ...rest
    } = props;

    const styles: SerializedStyles[] = [];
    if (css) styles.concat(css);
    styles.push(dropdownButtonStyles);

    return (
        <div css={dropdownButtonStyles} ref={dropdownRef}>
            <Button css={styles} onClick={handleRootClick} {...rest}>{children} <Icon icon="CaretDown" size={20} /></Button>

            {isOpen && (
                <div css={dropdownStyles}>
                    {items && items.map((item, index) => (
                        <button
                            key={index}
                            css={buttonStyles}
                            onClick={() => {
                                item.onClick();
                                setIsOpen(false);
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownButton;