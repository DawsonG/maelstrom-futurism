import { ReactNode, useState } from 'react';
import styles from './Table.module.scss';

interface ColumnProps {
    name: string;
    header: () => ReactNode;
    cell: (data: string) => ReactNode;
    footer?: () => ReactNode;
}

interface TableProps {
    heading?: string;
    columns: ColumnProps[];
    data: Record<string, any>[];
}

type ColumnWidths = Record<string, number>;

const useConfigurableColumnWidths = (cols: ColumnProps[]) => {
    const widths = cols.length === 0 ? {} : cols.reduce<ColumnWidths>((acc, col) => {
        acc[col.name] = 100 / cols.length;
        return acc;
    }, {});

    return { widths };
}

const Table = ({ heading, columns, data }: TableProps) => {
    const { widths } = useConfigurableColumnWidths(columns);
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

    console.log(widths);

    return (
        <div className={styles.tableWrapper}>
            {heading && (
                <div className={styles.heading}>{heading}</div>
            )}
            <table>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th style={{ width: `${widths[col.name]}%`}} scope="column" key={col.name}>{col.header()}</th>    
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i}>
                            {columns.map(col => (
                                <td key={col.name}>{col.cell(row[col.name])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
