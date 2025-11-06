import { ReactNode, useState } from 'react';
import styles from './Table.module.scss';

interface ColumnProps {
    name: string;
    header: () => ReactNode;
    cell: (data: string) => ReactNode;
    footer?: () => ReactNode;
}

interface TableProps {
    columns: ColumnProps[];
    data: Record<string, any>[];
}

const Table = ({ columns, data }: TableProps) => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

    return (
        <div className={styles.tableWrapper}>
            <table>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th>{col.header()}</th>    
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr>
                            {columns.map(col => (
                                <td>{col.cell(row[col.name])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
