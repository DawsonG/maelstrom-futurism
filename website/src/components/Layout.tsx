import { Container } from '@maelstrom-futurism/layout';
import { Sidebar } from '@maelstrom-futurism/sidebar'; 
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div style={{ display: 'flex', maxWidth: 'calc(100vw - 20px)' }}>
            <Sidebar>
                <Sidebar.Heading title='Maelstrom Futurism' />
                <ul>
                    <li><Link to='/getting_started'>Getting Started</Link></li>
                    <li><Link to='/theming'>Theming</Link></li>
                    <li>
                        Components
                        <ul>
                            <li><Link to='/box_and_contentbox'>Box and ContentBox</Link></li>
                            <li><Link to='/paper'>Paper</Link></li>
                            <li><Link to='/inputs'>Inputs</Link></li>
                            <li><Link to='/buttons'>Buttons</Link></li>
                        </ul>
                    </li>
                    <li>
                        Layouts
                        <ul>
                            <li><Link to='/layout/container'>Container</Link></li>
                            <li><Link to='/layout/grid'>Grids &amp; Columns</Link></li>
                        </ul>
                    </li>
                    <li>
                        Tooling
                        <ul>
                            <li><Link to='/color_tool'>Color Tool</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/icons">Icons</Link></li>
                </ul>
            </Sidebar>

            <Container maxWidth='980px'>
                <Outlet />
            </Container>
        </div>
    );
}

export default Layout;