# `layout`

> TODO: description

## Components

### Container

Containers are intended only to be the top level component of a page.  They come in two varieties, normal and fluid.  Normal containers have a set size for each screen breakpoint.  Fluid containers are always 100% width.

```
import { Container } from '@maelstrom-futurism/layout';


```

### Grids and Columns

The Grid component accepts any number of equal 

```
import { Grid, Column } from '@maelstrom-futurism/layout';

const ThreeEqualColumnLayout = () => (
    <Grid>
        <Column>
            <h1>Column One</h1>
        </Column>
        <Column>
            <h1>Column Two</h1>
        </Column>
        <Column>
            <h1>Column Three</h1>
        </Column>
    </Grid>
);
```