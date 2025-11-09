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

const Table = ({ heading, columns, data }: TableProps) => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

    return (
        <div className={styles.tableWrapper}>
            {heading && (
                <div className={styles.heading}>{heading}</div>
            )}
            <table>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col.name}>{col.header()}</th>    
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
