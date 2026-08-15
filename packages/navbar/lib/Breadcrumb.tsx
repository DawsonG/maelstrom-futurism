import { ReactNode } from 'react';

import styles from './Breadcrumb.module.scss';

export interface BreadcrumbItem {
  /** The label shown for this item. */
  label: string;

  /** If given, the item renders as a link. The last item (or any item
   *  without an `href`) renders as plain, non-interactive text instead —
   *  the conventional "current page" treatment. */
  href?: string;

  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className }: BreadcrumbProps): ReactNode => {
  const classNames = className ? `${styles.breadcrumb} ${className}` : styles.breadcrumb;

  return (
    <ul className={classNames} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;

        return (
          <li key={`${item.label}-${index}`} className={styles.item}>
            {item.href && !isCurrent
              ? (
                  <a href={item.href} onClick={item.onClick} className={styles.link}>
                    {item.label}
                  </a>
                )
              : (
                  <span className={styles.current} aria-current={isCurrent ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumb;
