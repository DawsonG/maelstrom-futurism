import { Button, ButtonGroup } from "@maelstrom-futurism/button";
import { Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";

const Buttons = () => (
    <Container>
        <h1>Button</h1>

        <p>
            HTML &lt;button/&gt; tag with fancy ripple on click effect.
        </p>

        <p>Found in <code>@maelstrom-futurism/button</code> and <code>maelstrom-futurism</code>.</p>

        <h2>Variants</h2>
        <CodeView>
{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="cancel">Cancel</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
        </CodeView>

        <div>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="cancel">Cancel</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
        </div>

        <h2>Sizes</h2>
        <CodeView>
{`<Button scale="small">Small</Button>
<Button scale="normal">Normal</Button>
<Button scale="big">Large</Button>`}
        </CodeView>

        <div>
            <Button scale="small">Small</Button>
            <Button scale="normal">Normal</Button>
            <Button scale="big">Large</Button>
        </div>

        <h2>Button Groups</h2>
        <CodeView>
{`<ButtonGroup>
    <Button>One</Button>
    <Button>2</Button>
    <Button>| | |</Button>
</ButtonGroup>`}
        </CodeView>

        <div>
            <ButtonGroup>
                <Button>One</Button>
                <Button>2</Button>
                <Button>| | |</Button>
            </ButtonGroup>
        </div>
    </Container>
);

export default Buttons;