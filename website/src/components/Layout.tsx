import { Column, Container, Grid } from '@maelstrom-futurism/layout';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <Container fluid>
            <Grid>
                <Column xs={2}>
                    <ul>
                        <li><Link to='/getting_started'>Getting Started</Link></li>
                        <li><Link to='/theming'>Theming</Link></li>
                        <li>
                            Layouts
                            <ul>
                                <li><Link to='/layout/container'>Container</Link></li>
                                <li><Link to='/layout/grid'>Grids &amp; Columns</Link></li>
                            </ul>
                        </li>
                        <li><Link to='/inputs'>Inputs</Link></li>
                        <li><Link to='/paper'>Paper</Link></li>
                        <li><Link to='/color_tool'>Color Tool</Link></li>
                    </ul>
                </Column>
                <Column xs={10}>
                    <Outlet />
                </Column>
            </Grid>
        </Container>
    );
}

export default Layout;