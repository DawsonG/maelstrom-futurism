import { DropdownButton } from "@maelstrom-futurism/button";
import { Container } from "@maelstrom-futurism/layout";
import { Breadcrumb, Navbar } from "@maelstrom-futurism/navbar";
import CodeView from "../components/CodeView";

const blockStyle = {
    backgroundColor: 'white',
    marginBottom: '20px'
};

const PageNavbar = () => (
    <Container>
        <h1>Navbar</h1>
        
        <p>Renders a top navigation bar</p>
        
        <div style={blockStyle}>
            <Navbar
                brand={<h1></h1>}
            />
        </div>

        <p></p>

        <div style={blockStyle}>
            <Navbar
                brand={<h1>MF</h1>}
            />
        </div>

        <div style={blockStyle}>
            <Navbar
                brand={<h1>MF</h1>}
                rightSide={<DropdownButton 
                    items={[
                        {
                            label: "First Option",
                            onClick: () => alert("First Option clicked")
                        },
                        {
                            label: "Second Option",
                            onClick: () => alert("Second Option clicked")
                        }
                    ]}
                />}   
            />
        </div>

        <h2>Breadcrumb</h2>

        <p>
            Renders a row of navigation items separated by a <code>/</code>. Every item except the
            last renders as a real link (as long as it has an <code>href</code>); the last item — or
            any item without an <code>href</code> — renders as plain, non-interactive text with{" "}
            <code>aria-current="page"</code> on the final item.
        </p>

        <CodeView>{`<Breadcrumb
    items={[
        { label: "Home", href: "/" },
        { label: "Settings", href: "/settings" },
        { label: "Account", href: "/settings/account" },
        { label: "Security", href: "/settings/account/security" },
        { label: "Two-Factor Auth" },
    ]}
/>`}</CodeView>

        <Breadcrumb
            items={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Account", href: "/settings/account" },
                { label: "Security", href: "/settings/account/security" },
                { label: "Two-Factor Auth" },
            ]}
        />

    </Container>
);

export default PageNavbar;