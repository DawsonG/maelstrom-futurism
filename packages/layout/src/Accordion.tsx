import React, { createContext, useContext, useEffect, useId, useState } from 'react';
import { css } from '@emotion/react';
import { EASE_FUNCTION } from '@maelstrom-futurism/core';

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (id: string) => void;
  openByDefault: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

export interface AccordionProps {
  children?: React.ReactNode;

  /**
   * By default, items within an `Accordion` behave as an exclusive group —
   * opening one closes the rest. Pass `allowMultiple` to let more than one
   * item stay open at a time.
   */
  allowMultiple?: boolean;

  /** className applied to the outer container */
  className?: string;
}

const accordionContainer = css`
    display: flex;
    flex-direction: column;
    border-radius: var(--mf-radius-card);
    overflow: hidden;
    border: solid var(--mf-border-width-thin) var(--mf-secondary);
`;

const Accordion = ({ children, allowMultiple, className }: AccordionProps): React.ReactNode => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const isOpen = prev.has(id);

      if (allowMultiple) {
        const next = new Set(prev);
        if (isOpen) next.delete(id);
        else next.add(id);
        return next;
      }

      return isOpen ? new Set() : new Set([id]);
    });
  };

  const openByDefault = (id: string) => {
    setOpenItems((prev) => {
      if (prev.has(id)) return prev;
      return allowMultiple ? new Set(prev).add(id) : new Set([id]);
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle, openByDefault }}>
      <div css={accordionContainer} className={className}>{children}</div>
    </AccordionContext.Provider>
  );
};

export interface AccordionItemProps {
  /** Heading content shown in the always-visible trigger row */
  title: React.ReactNode;

  children?: React.ReactNode;

  /** Open on first render (uncontrolled) */
  defaultOpen?: boolean;

  /** className applied to the item's outer wrapper */
  className?: string;
}

const itemContainer = css`
    border-bottom: solid var(--mf-border-width-thin) var(--mf-secondary);
    background-color: var(--mf-content);

    &:last-of-type {
        border-bottom: none;
    }
`;

const standaloneItemContainer = css`
    border-radius: var(--mf-radius-card);
    overflow: hidden;
    border: solid var(--mf-border-width-thin) var(--mf-secondary);
`;

const trigger = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75em;
    width: 100%;
    padding: 0.9em 1.1em;
    border: none;
    background: none;
    color: var(--mf-text);
    font-size: 1rem;
    font-family: inherit;
    text-align: left;
    cursor: pointer;

    &:hover {
        background-color: var(--mf-surface-hover);
    }

    &:focus-visible {
        outline: var(--mf-border-width-thin) solid var(--mf-focus);
        outline-offset: -2px;
    }
`;

const chevron = (open: boolean) => css`
    display: inline-flex;
    flex: none;
    transform: rotate(${open ? 180 : 0}deg);
    transition: transform var(--mf-dur-fast) ${EASE_FUNCTION};
`;

const panel = (open: boolean) => css`
    display: grid;
    grid-template-rows: ${open ? '1fr' : '0fr'};
    transition: grid-template-rows var(--mf-dur-normal) ${EASE_FUNCTION};
`;

const panelInner = css`
    overflow: hidden;
    min-height: 0;
`;

const panelContent = css`
    padding: 0 1.1em 0.9em;
    color: var(--mf-text);
`;

export const AccordionItem = ({ title, children, defaultOpen, className }: AccordionItemProps): React.ReactNode => {
  const id = useId();
  const context = useContext(AccordionContext);
  const [standaloneOpen, setStandaloneOpen] = useState(!!defaultOpen);

  useEffect(() => {
    if (context && defaultOpen) context.openByDefault(id);
  }, []);

  const isOpen = context ? context.openItems.has(id) : standaloneOpen;

  const handleToggle = () => {
    if (context) context.toggle(id);
    else setStandaloneOpen((prev) => !prev);
  };

  return (
    <div css={[itemContainer, !context && standaloneItemContainer]} className={className}>
      <button type="button" css={trigger} onClick={handleToggle} aria-expanded={isOpen}>
        <span>{title}</span>
        <span css={chevron(isOpen)} aria-hidden="true">&#9660;</span>
      </button>
      <div css={panel(isOpen)}>
        <div css={panelInner}>
          <div css={panelContent}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
