import { Container } from '@maelstrom-futurism/layout';
import { Sidebar } from '@maelstrom-futurism/sidebar';
import { LogoMark } from '@maelstrom-futurism/core';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div style={{ display: 'flex', maxWidth: 'calc(100vw - 20px)' }}>
            <Sidebar isClosable={true}>
                <Sidebar.Heading title='Maelstrom Futurism' logo={<>
                    <LogoMark width={28} height={28} />
                    Maelstrom Futurism
                </>} />
                <ul>
                    <li><Link to='/getting_started'>Getting Started</Link></li>
                    <li><Link to='/theming'>Theming</Link></li>
                    <li>
                        Components
                        <ul>
                            <li><Link to='/box_and_contentbox'>Box and ContentBox</Link></li>
                            <li><Link to='/paper'>Paper</Link></li>
                            <li><Link to='/paper_readability'>Paper with Readability Controls</Link></li>
                            <li><Link to='/inputs'>Inputs</Link></li>
                            <li><Link to='/dropzone'>DropZone</Link></li>
                            <li><Link to='/radio'>Radio &amp; RadioGroup</Link></li>
                            <li><Link to='/checkbox'>Checkbox &amp; CheckboxGroup</Link></li>
                            <li><Link to='/buttons'>Buttons</Link></li>
                            <li><Link to="/modal">Modal</Link></li>
                            <li><Link to='/table'>Table</Link></li>
                            <li><Link to='/tooltip'>Tooltip</Link></li>
                        </ul>
                    </li>
                    <li>
                        Layouts
                        <ul>
                            <li><Link to='/layout/containers'>Container</Link></li>
                            <li><Link to='/layout/grid'>Grids &amp; Columns</Link></li>
                        </ul>
                    </li>
                    {/*<li>
                        Tooling
                        <ul>
                            <li><Link to='/color_tool'>Color Tool</Link></li>
                        </ul>
                    </li>*/}
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