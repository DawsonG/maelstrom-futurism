import { Container } from '@maelstrom-futurism/layout';
import { Sidebar } from '@maelstrom-futurism/sidebar'; 
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar>
                <Sidebar.Heading title='Maelstrom Futurism' />
                <ul>
                    <li><Link to='/getting_started'>Getting Started</Link></li>
                    <li><Link to='/theming'>Theming</Link></li>
                    <li>
                        Components
                        <ul>
                            <li></li>
                        </ul>
                    </li>
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
            </Sidebar>

            <Container>
                <Outlet />
            </Container>
        </div>
    );
}

export default Layout;