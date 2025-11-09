import { Table } from '@maelstrom-futurism/table';
import { Container } from '@maelstrom-futurism/layout';

import CodeView from '../components/CodeView';

function PageTable() {
    return (
        <Container>
            <h1>Table</h1>

            <p>MF comes with a simple Table component.</p>

            <CodeView>
{`<Table
    heading="Books"
    columns={[
        {
            name: 'title',
            header: () => 'Title',
            cell: (data: string) => <>{data}</>,
        },
        {
            name: 'isbn',
            header: () => 'ISBN',
            cell: (data: string) => <>{data}</>,
        }
    ]}
    data={[
        {
            title: 'For Whom The Bell Tolls',
            isbn: '9780020518501',
        },
        {
            title: 'The Great Gatsby',
            isbn: '9780198864400',
        }
    ]}
/>`}
            </CodeView>

            <Table
                heading="Books"
                columns={[
                    {
                        name: 'title',
                        header: () => 'Title',
                        cell: (data: string) => <>{data}</>,
                    },
                    {
                        name: 'isbn',
                        header: () => 'ISBN',
                        cell: (data: string) => <>{data}</>,
                    }
                ]}
                data={[
                    {
                        title: 'For Whom The Bell Tolls',
                        isbn: '9780020518501',
                    },
                    {
                        title: 'The Great Gatsby',
                        isbn: '9780198864400',
                    }
                ]}
            />
        </Container>
    );
}

export default PageTable;