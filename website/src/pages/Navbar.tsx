import { DropdownButton } from "@maelstrom-futurism/button";
import { Container } from "@maelstrom-futurism/layout";
import { Navbar } from "@maelstrom-futurism/navbar";

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

    </Container>
);

export default PageNavbar;