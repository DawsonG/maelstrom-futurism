import { Button, ButtonGroup, DropdownButton } from "@maelstrom-futurism/button";
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
{`<Button size="xs">Very Small [xs]</Button>
<Button size="sm">Small [sm]</Button>
<Button size="md">Medium/Normal [md]</Button>
<Button size="lg">Large [lg]</Button>
<Button size="xl">Very Large [xl]</Button>`}
        </CodeView>

        <div>
            <Button size="xs">Very Small [xs]</Button>
            <Button size="sm">Small [sm]</Button>
            <Button size="md">Medium/Normal [md]</Button>
            <Button size="lg">Large [lg]</Button>
            <Button size="xl">Very Large [xl]</Button>
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

        <h2>Dropdown Buttons</h2>
        <CodeView>
{`<DropdownButton
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
>Button with Dropdown</DropdownButton>
`}
        </CodeView>

        <div>
            <DropdownButton items={[
                {
                    label: "First Option",
                    onClick: () => alert("First Option clicked")
                },
                {
                    label: "Second Option",
                    onClick: () => alert("Second Option clicked")
                },
                {
                    label: "Third Option",
                    onClick: () => alert("Third Option clicked")
                }
            ]}>Button with Dropdown</DropdownButton>
        </div>

        <div style={{ marginBottom: "160px" }} />
    </Container>
);

export default Buttons;