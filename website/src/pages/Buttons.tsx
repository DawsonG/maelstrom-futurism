import Button from "@maelstrom-futurism/button";
import { Container } from "@maelstrom-futurism/layout";

const Buttons = () => (
    <Container>
        <h1>Button</h1>

        <p>
            HTML &lt;button/&gt; tag with fancy ripple on click effect.
        </p>

        <p>Found in <code>@maelstrom-futurism/button</code> and <code>maelstrom-futurism</code>.</p>

        <h2>Variants</h2>
        <div>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="cancel">Cancel</Button>
        </div>

        <h2>Sizes</h2>
        <div>
            <Button variant="primary" scale="small">Small</Button>
            <Button variant="primary" scale="normal">Normal</Button>
            <Button variant="primary" scale="big">Large</Button>
        </div>
    </Container>
);

export default Buttons;