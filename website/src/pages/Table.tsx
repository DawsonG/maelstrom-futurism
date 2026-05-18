import { Table } from '@maelstrom-futurism/table';
import { Pill, type PillVariant } from '@maelstrom-futurism/core';
import { Container } from '@maelstrom-futurism/layout';

import CodeView from '../components/CodeView';

const STATUS_MAP: Record<string, { variant: PillVariant; label: string }> = {
    active:    { variant: 'success', label: 'Active' },
    trial:     { variant: 'info',    label: 'Trial' },
    past_due:  { variant: 'warning', label: 'Past due' },
    cancelled: { variant: 'muted',   label: 'Cancelled' },
};

const BOOKS = [
    { title: 'For Whom The Bell Tolls', author: 'Ernest Hemingway', isbn: '9780020518501', status: 'active', copies: 3 },
    { title: 'The Great Gatsby',         author: 'F. Scott Fitzgerald', isbn: '9780198864400', status: 'active', copies: 5 },
    { title: 'Dune',                      author: 'Frank Herbert',       isbn: '9780441013593', status: 'trial',    copies: 2 },
    { title: 'Neuromancer',               author: 'William Gibson',      isbn: '9780441569595', status: 'active', copies: 1 },
    { title: '1984',                      author: 'George Orwell',       isbn: '9780451524935', status: 'past_due', copies: 4 },
    { title: 'Fahrenheit 451',            author: 'Ray Bradbury',        isbn: '9781451673319', status: 'cancelled', copies: 0 },
    { title: 'Snow Crash',                author: 'Neal Stephenson',     isbn: '9780553380958', status: 'active', copies: 2 },
    { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin',  isbn: '9780441478125', status: 'active', copies: 3 },
    { title: 'Brave New World',           author: 'Aldous Huxley',      isbn: '9780060850524', status: 'trial',    copies: 1 },
    { title: 'The Road',                  author: 'Cormac McCarthy',    isbn: '9780307387899', status: 'active', copies: 6 },
    { title: 'Slaughterhouse-Five',       author: 'Kurt Vonnegut',      isbn: '9780385333849', status: 'active', copies: 2 },
    { title: 'The Dispossessed',          author: 'Ursula K. Le Guin',  isbn: '9780061054884', status: 'past_due', copies: 1 },
];

function PageTable() {
    return (
        <Container>
            <h1>Table</h1>

            <p>A full-featured data table with client-side search, sortable columns, density control, and pagination. All toolbar and footer features can be disabled independently.</p>

            <Table
                heading="Library Catalog"
                columns={[
                    {
                        name: 'title',
                        header: () => 'Title',
                        cell: (data: string | number) => <strong>{data}</strong>,
                        sortable: true,
                    },
                    {
                        name: 'author',
                        header: () => 'Author',
                        cell: (data: string | number) => <>{data}</>,
                        sortable: true,
                    },
                    {
                        name: 'isbn',
                        header: () => 'ISBN',
                        cell: (data: string | number) => <span style={{ fontFamily: 'var(--mf-font-mono)', fontSize: 13 }}>{data}</span>,
                    },
                    {
                        name: 'status',
                        header: () => 'Status',
                        cell: (data: string | number) => {
                            const s = STATUS_MAP[data] ?? { variant: 'muted' as PillVariant, label: data };
                            return <Pill variant={s.variant} dot>{s.label}</Pill>;
                        },
                        sortable: true,
                    },
                    {
                        name: 'copies',
                        header: () => 'Copies',
                        cell: (data: string | number) => <>{data}</>,
                        sortable: true,
                        align: 'right',
                        footer: () => <>Total: {BOOKS.reduce((s, b) => s + b.copies, 0)}</>,
                    },
                ]}
                data={BOOKS}
                defaultPageSize={8}
                onRowAction={row => alert(`Actions for: ${row.title}`)}
                footer="Data sourced from the Open Library catalogue · Last synced 2026-05-12"
            />

            <h2>Minimal (search + density + pagination off)</h2>

            <CodeView>
{`<Table
    heading="Books"
    columns={[
        { name: 'title',  header: () => 'Title',  cell: (d: string | number) => <>{d}</> },
        { name: 'author', header: () => 'Author', cell: (d: string | number) => <>{d}</> },
    ]}
    data={data}
    showSearch={false}
    showDensity={false}
    showPagination={false}
/>`}
            </CodeView>

            <Table
                heading="Books"
                columns={[
                    { name: 'title',  header: () => 'Title',  cell: (d: string | number) => <>{d}</> },
                    { name: 'author', header: () => 'Author', cell: (d: string | number) => <>{d}</> },
                ]}
                data={BOOKS.slice(0, 4)}
                showSearch={false}
                showDensity={false}
                showPagination={false}
            />
        </Container>
    );
}

export default PageTable;