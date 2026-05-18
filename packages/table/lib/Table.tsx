import { ReactNode, useState, useMemo } from 'react';
import { css } from '@emotion/react';
import { EASE_FUNCTION } from '@maelstrom-futurism/core';
import { Icon } from '@maelstrom-futurism/icons';

export type Density = 'compact' | 'comfortable' | 'spacious';

export interface ColumnProps {
    name: string;
    header: () => ReactNode;
    cell: (data: any, row: Record<string, any>) => ReactNode;
    footer?: () => ReactNode;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'right' | 'center';
}

export interface TableProps {
    heading?: string;
    columns: ColumnProps[];
    data: Record<string, any>[];
    footer?: ReactNode;
    showSearch?: boolean;
    searchPlaceholder?: string;
    showDensity?: boolean;
    defaultDensity?: Density;
    showPagination?: boolean;
    defaultPageSize?: number;
    pageSizeOptions?: number[];
    onRowAction?: (row: Record<string, any>) => void;
    rowActionIcon?: ReactNode;
}


const DENSITY_LABELS: Record<Density, string> = {
    compact: 'Compact',
    comfortable: 'Default',
    spacious: 'Spacious',
};

const DENSITY_PADDING: Record<Density, string> = {
    compact: '6px 16px',
    comfortable: '10px 16px',
    spacious: '16px',
};

const DENSITY_FONT_SIZE: Record<Density, string> = {
    compact: '13px',
    comfortable: '14px',
    spacious: '15px',
};

const Table = ({
    heading,
    columns,
    data,
    footer,
    showSearch = true,
    searchPlaceholder = 'Search…',
    showDensity = true,
    defaultDensity = 'comfortable',
    showPagination = true,
    defaultPageSize = 8,
    pageSizeOptions = [8, 16, 32],
    onRowAction,
    rowActionIcon,
}: TableProps) => {
    const ease = EASE_FUNCTION;

    const [sortCol, setSortCol] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [density, setDensity] = useState<Density>(defaultDensity);

    const showToolbar = !!heading || showSearch || showDensity;
    const hasFooterRow = columns.some(col => col.footer);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return data;
        return data.filter(row =>
            columns.some(col => {
                const val = row[col.name];
                return typeof val === 'string' && val.toLowerCase().includes(q);
            })
        );
    }, [data, query, columns]);

    const sorted = useMemo(() => {
        if (!sortCol) return filtered;
        return [...filtered].sort((a, b) => {
            const av = a[sortCol], bv = b[sortCol];
            const cmp = typeof av === 'number' && typeof bv === 'number'
                ? av - bv
                : String(av ?? '').localeCompare(String(bv ?? ''));
            return sortDir === 'asc' ? cmp : -cmp;
        });
    }, [filtered, sortCol, sortDir]);

    const totalRows = sorted.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageStart = (currentPage - 1) * pageSize;
    const pageRows = showPagination ? sorted.slice(pageStart, pageStart + pageSize) : sorted;

    const handleSort = (colName: string) => {
        if (sortCol === colName) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCol(colName);
            setSortDir('asc');
        }
        setPage(1);
    };

    const getPageButtons = (): (number | 'ellipsis')[] => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const btns: (number | 'ellipsis')[] = [1];
        if (currentPage > 3) btns.push('ellipsis');
        const lo = Math.max(2, currentPage - 1);
        const hi = Math.min(totalPages - 1, currentPage + 1);
        for (let i = lo; i <= hi; i++) btns.push(i);
        if (currentPage < totalPages - 2) btns.push('ellipsis');
        btns.push(totalPages);
        return btns;
    };

    const tdPadding = DENSITY_PADDING[density];
    const tdFontSize = DENSITY_FONT_SIZE[density];
    // ── Styles ──────────────────────────────────────────────────────────────

    const wrapperStyle = css`
        border: 1px solid var(--nord-polar-3);
        border-radius: var(--mf-radius-card);
        overflow: hidden;
        background: var(--mf-content);
        color: var(--mf-text);
        line-height: 1.6;
    `;

    const toolbarStyle = css`
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 20px;
        border-bottom: 1px solid var(--nord-polar-3);
    `;

    const headingGroupStyle = css`
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin: 0;
        font-size: var(--mf-size-md);
        font-weight: 500;
        line-height: 1.2;
        letter-spacing: -0.01em;
    `;

    const countStyle = css`
        font-family: var(--mf-font-mono);
        font-size: 11px;
        color: var(--mf-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-weight: 400;
    `;

    const spacerStyle = css`flex: 1;`;

    const searchWrapStyle = css`
        position: relative;
        width: 240px;
        display: block;

        input {
            width: 100%;
            height: 36px;
            background: transparent;
            color: var(--mf-text);
            border: none;
            outline: 1px solid var(--mf-secondary);
            border-radius: var(--mf-radius-input);
            padding: 0 12px 0 34px;
            font-size: 14px;
            font-family: inherit;
            box-sizing: border-box;
            transition: outline-color var(--mf-dur-fast) ${ease};

            &::placeholder { color: color-mix(in srgb, var(--mf-text) 44%, transparent); }
            &:hover { outline-color: var(--mf-text); }
            &:focus { outline-color: var(--mf-focus); }
        }
    `;

    const searchIconStyle = css`
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--mf-text-muted);
        pointer-events: none;
        display: flex;
    `;

    const densityGroupStyle = css`
        display: inline-flex;
        border-radius: 9999px;
        background: var(--mf-background);
        padding: 3px;
        gap: 2px;

        button {
            background: transparent;
            border: none;
            color: color-mix(in srgb, var(--mf-text) 63%, transparent);
            font-family: inherit;
            font-size: 12px;
            padding: 5px 12px;
            border-radius: 9999px;
            cursor: pointer;
            transition: background var(--mf-dur-fast), color var(--mf-dur-fast);

            &[aria-pressed="true"] {
                background: var(--mf-primary);
                color: var(--mf-text);
            }
        }
    `;

    const tableStyle = css`
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
    `;

    const thBaseStyle = css`
        text-align: left;
        padding: 10px 16px;
        border-bottom: 1px solid var(--nord-polar-3);
        border-right: 1px solid var(--nord-polar-3);
        font-weight: 500;
        background: var(--mf-content);
        color: var(--mf-text);
        user-select: none;
        white-space: nowrap;

        &:last-child { border-right: none; }

        > span {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: color var(--mf-dur-fast) ${ease};
        }
    `;

    const thSortableStyle = css`
        cursor: pointer;
        &:hover > span { color: var(--mf-link); }
    `;

    const sortArrow = (colName: string) => css`
        display: inline-flex;
        width: 12px;
        height: 12px;
        color: ${sortCol === colName ? 'var(--mf-link)' : 'color-mix(in srgb, var(--mf-text) 25%, transparent)'};
        transition: color var(--mf-dur-fast) ${ease}, transform var(--mf-dur-fast) ${ease};
        transform: ${sortCol === colName && sortDir === 'asc' ? 'rotate(180deg)' : 'none'};
    `;

    const actionThStyle = css`
        width: 44px;
        border-bottom: 1px solid var(--nord-polar-3);
        border-right: none;
        background: var(--mf-content);
    `;

    const rowStyle = css`
        transition: background var(--mf-dur-fast) ${ease};
        &:hover td { background: var(--mf-surface-hover); }
    `;

    const tdBaseStyle = css`
        padding: ${tdPadding};
        font-size: ${tdFontSize};
        border-bottom: 1px solid var(--mf-border-muted);
        vertical-align: middle;
        transition: background var(--mf-dur-fast) ${ease};
    `;

    const lastRowTdStyle = css`
        border-bottom: none;
    `;

    const actionTdStyle = css`
        padding: 0 8px;
        border-bottom: 1px solid var(--mf-border-muted);
        text-align: center;
        vertical-align: middle;
        transition: background var(--mf-dur-fast) ${ease};
    `;

    const actionBtnStyle = css`
        background: transparent;
        border: none;
        cursor: pointer;
        width: 28px;
        height: 28px;
        color: var(--mf-text-muted);
        border-radius: 9999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background var(--mf-dur-fast) ${ease}, color var(--mf-dur-fast) ${ease};

        &:hover {
            background: var(--mf-surface-press);
            color: var(--mf-text);
        }
    `;

    const tfootTdStyle = css`
        padding: 10px 16px;
        border-top: 1px solid var(--nord-polar-3);
        color: var(--mf-text-muted);
        font-size: 13px;
    `;

    const paginationFooterStyle = css`
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 12px 20px;
        border-top: 1px solid var(--nord-polar-3);
        font-size: 13px;
    `;

    const rangeStyle = css`
        color: color-mix(in srgb, var(--mf-text) 63%, transparent);
        font-family: var(--mf-font-mono);
        font-size: 12px;
        white-space: nowrap;
    `;

    const perPageStyle = css`
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: color-mix(in srgb, var(--mf-text) 63%, transparent);
        white-space: nowrap;

        select {
            background: var(--mf-background);
            color: var(--mf-text);
            border: 1px solid var(--nord-polar-3);
            border-radius: var(--mf-radius-input);
            padding: 4px 8px;
            font: inherit;
            font-size: 13px;
            outline: none;
            cursor: pointer;
        }
    `;

    const pagerStyle = css`
        display: inline-flex;
        align-items: center;
        gap: 4px;
        margin-left: auto;

        button {
            min-width: 32px;
            height: 32px;
            padding: 0 10px;
            background: transparent;
            color: var(--mf-text);
            border: none;
            border-radius: 9999px;
            cursor: pointer;
            font: inherit;
            font-size: 13px;
            transition: background var(--mf-dur-fast) ${ease}, color var(--mf-dur-fast) ${ease};

            &:hover:not(:disabled) { background: var(--mf-surface-press); }
            &[aria-current="page"] { background: var(--mf-primary); }
            &:disabled { opacity: 0.35; cursor: not-allowed; }
        }

        .ellipsis {
            color: color-mix(in srgb, var(--mf-text) 44%, transparent);
            padding: 0 4px;
        }
    `;

    const tableFooterStyle = css`
        padding: 12px 20px;
        border-top: 1px solid var(--nord-polar-3);
        font-size: 12px;
        color: var(--mf-text-muted);
        font-family: var(--mf-font-mono);
    `;

    // ── Render ───────────────────────────────────────────────────────────────

    const rangeFrom = totalRows === 0 ? 0 : pageStart + 1;
    const rangeTo = Math.min(pageStart + pageSize, totalRows);

    return (
        <div css={wrapperStyle}>
            {showToolbar && (
                <div css={toolbarStyle}>
                    {heading && (
                        <h3 css={headingGroupStyle}>
                            <span>{heading}</span>
                            <span css={countStyle}>{totalRows} record{totalRows !== 1 ? 's' : ''}</span>
                        </h3>
                    )}
                    <div css={spacerStyle} />
                    {showSearch && (
                        <label css={searchWrapStyle}>
                            <span css={searchIconStyle}>
                                <Icon icon="Search" size={16} />
                            </span>
                            <input
                                value={query}
                                onChange={e => { setQuery(e.target.value); setPage(1); }}
                                placeholder={searchPlaceholder}
                            />
                        </label>
                    )}
                    {showDensity && (
                        <div css={densityGroupStyle} role="group" aria-label="Row density">
                            {(Object.keys(DENSITY_LABELS) as Density[]).map(d => (
                                <button
                                    key={d}
                                    aria-pressed={density === d ? 'true' : 'false'}
                                    onClick={() => setDensity(d)}
                                >
                                    {DENSITY_LABELS[d]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <table css={tableStyle}>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th
                                key={col.name}
                                css={[thBaseStyle, col.sortable && thSortableStyle]}
                                style={{ width: col.width, textAlign: col.align ?? 'left' }}
                                onClick={col.sortable ? () => handleSort(col.name) : undefined}
                                scope="col"
                            >
                                <span>
                                    {col.header()}
                                    {col.sortable && (
                                        <span css={sortArrow(col.name)}>
                                            <Icon icon="AngleDown" size={12} />
                                        </span>
                                    )}
                                </span>
                            </th>
                        ))}
                        {onRowAction && <th css={actionThStyle} />}
                    </tr>
                </thead>
                <tbody>
                    {pageRows.map((row, i) => {
                        const isLast = i === pageRows.length - 1;
                        return (
                            <tr key={i} css={rowStyle}>
                                {columns.map(col => (
                                    <td
                                        key={col.name}
                                        css={[tdBaseStyle, isLast && lastRowTdStyle]}
                                        style={{ textAlign: col.align ?? 'left' }}
                                    >
                                        {col.cell(row[col.name], row)}
                                    </td>
                                ))}
                                {onRowAction && (
                                    <td css={[actionTdStyle, isLast && lastRowTdStyle]}>
                                        <button
                                            css={actionBtnStyle}
                                            onClick={() => onRowAction(row)}
                                            aria-label="Row actions"
                                        >
                                            {rowActionIcon ?? <Icon icon="DotsHorizontal" size={16} />}
                                        </button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
                {hasFooterRow && (
                    <tfoot>
                        <tr>
                            {columns.map(col => (
                                <td key={col.name} css={tfootTdStyle} style={{ textAlign: col.align ?? 'left' }}>
                                    {col.footer?.()}
                                </td>
                            ))}
                            {onRowAction && <td css={tfootTdStyle} />}
                        </tr>
                    </tfoot>
                )}
            </table>

            {showPagination && (
                <div css={paginationFooterStyle}>
                    <span css={rangeStyle}>{rangeFrom}–{rangeTo} of {totalRows}</span>
                    <div css={perPageStyle}>
                        <span>Per page</span>
                        <select
                            value={pageSize}
                            onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
                        >
                            {pageSizeOptions.map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    <nav css={pagerStyle} aria-label="Pagination">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                        >‹</button>
                        {getPageButtons().map((btn, i) =>
                            btn === 'ellipsis' ? (
                                <span key={`e${i}`} className="ellipsis">…</span>
                            ) : (
                                <button
                                    key={btn}
                                    onClick={() => setPage(btn as number)}
                                    aria-current={currentPage === btn ? 'page' : undefined}
                                >
                                    {btn}
                                </button>
                            )
                        )}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                        >›</button>
                    </nav>
                </div>
            )}

            {footer && (
                <div css={tableFooterStyle}>{footer}</div>
            )}
        </div>
    );
};

export default Table;