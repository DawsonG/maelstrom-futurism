import { ContentBox } from "@maelstrom-futurism/core";
import { Grid, Column, Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";

function PageGrid() {

    return (
        <Container>
            <h1>Grid &amp; Colums</h1>

            <p>Creates equal width columns using Flexbox styling.</p>

            <CodeView>{`import { Grid, Column } from "@maelstrom-futurism/layout";

const NormalGrid = () => (<Grid>
    <Columm>
        <ContentBox h='100px' />
    </Column>
    <Column>
        <ContentBox h='100px' />
    </Column>
    <Column>
        <ContentBox h='100px' />
    </Column>
</Grid>);
`}</CodeView>

            <Grid>
                <Column>
                    <ContentBox h='100px' />
                </Column>
                <Column>
                    <ContentBox h='100px' />
                </Column>
                <Column>
                    <ContentBox h='100px' />
                </Column>
            </Grid>

            <p>Also works vertically.</p> 

            <CodeView>{`import { Grid, Column } from "@maelstrom-futurism/layout";

const VerticalGrid = () => (<Grid direction='column'>
    <Columm>
        <ContentBox h='100px' />
    </Column>
    <Column>
        <ContentBox h='100px' />
    </Column>
    <Column>
        <ContentBox h='100px' />
    </Column>
</Grid>);
`}</CodeView>

            <Grid direction='column'>
                <Column>
                    <ContentBox h='100px' />
                </Column>
                <Column>
                    <ContentBox h='100px' />
                </Column>
                <Column>
                    <ContentBox h='100px' />
                </Column>
            </Grid>

            <p>Give relative widths using flex-basis.  Grids are based around 12 columns.
            By default each column will take an equal portion of the grid, but you can specify
            how many "column positions" to take up for different breakpoints.</p>

            <CodeView>{`import { Direction } from "@maelstrom-futurism/core";
import { Grid, Column } from "@maelstrom-futurism/layout";

const VerticalGrid = () => (<Grid>
    <Columm md={2}>
        <ContentBox h='100px' />
    </Column>
    <Column md={5}>
        <ContentBox h='100px' />
    </Column>
    <Column md={5}>
        <ContentBox h='100px' />
    </Column>
</Grid>);
`}</CodeView>

            <Grid>
                <Column md={2}>
                    <ContentBox h='100px' />
                </Column>
                <Column md={5}>
                    <ContentBox h='100px' />
                </Column>
                <Column md={5}>
                    <ContentBox h='100px' />
                </Column>
            </Grid>
        </Container>
    );
}

export default PageGrid;