import { useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "@maelstrom-futurism/button";
import { Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";

const Buttons = () => {
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveClick = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    return (
    <Container>
        <h1>Button</h1>

        <p>
            HTML &lt;button/&gt; tag with fancy ripple on click effect.
        </p>

        <p>Found in <code>@maelstrom-futurism/button</code> and <code>maelstrom-futurism</code>.</p>

        <h2>Variants</h2>
        <CodeView>{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="cancel">Cancel</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="link">Link</Button>`}
        </CodeView>

        <div>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="cancel">Cancel</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="link">Link</Button>
            
        </div>

        <h2>Sizes</h2>
        <CodeView>{`<Button size="xs">Very Small [xs]</Button>
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

        <h2>Loading State</h2>
        <p>
            Pass <code>loading</code> to disable the button and swap its content for an inline
            spinner. The button's width is measured just before the swap and pinned via
            <code>min-width</code>, so it doesn't shrink when its label disappears. Click the button
            below to see a simulated 2 second save.
        </p>
        <CodeView>{`const [isSaving, setIsSaving] = useState(false);

const handleSaveClick = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
};

<Button variant="primary" loading={isSaving} onClick={handleSaveClick}>
    Save Changes
</Button>`}
        </CodeView>

        <div>
            <Button variant="primary" loading={isSaving} onClick={handleSaveClick}>
                Save Changes
            </Button>
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

        <h3>Right-aligned Menu</h3>
        <p>Pass <code>align=&quot;right&quot;</code> to anchor the menu to the right edge of the trigger — useful near the right side of the viewport.</p>
        <CodeView>
{`<DropdownButton
    align="right"
    items={[
        { label: "Edit", onClick: () => alert("Edit clicked") },
        { label: "Delete", onClick: () => alert("Delete clicked") }
    ]}
>Actions</DropdownButton>
`}
        </CodeView>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <DropdownButton align="right" items={[
                { label: "Edit", onClick: () => alert("Edit clicked") },
                { label: "Delete", onClick: () => alert("Delete clicked") }
            ]}>Actions</DropdownButton>
        </div>

        <h2>Dropdown (generic wrapper)</h2>
        <p>
            <code>Dropdown</code> is the underlying primitive behind <code>DropdownButton</code> — it
            handles open/close state, click-outside dismissal, and closing on <code>Escape</code>, but
            accepts any trigger and any menu content, not just a <code>Button</code> with a flat item list.
        </p>
        <CodeView>
{`<Dropdown trigger={({ toggle, isOpen }) => (
    <span onClick={toggle} style={{ cursor: "pointer", textDecoration: "underline" }}>
        {isOpen ? "Close custom trigger" : "Open custom trigger"}
    </span>
)}>
    {({ close }) => (
        <div style={{ padding: "12px", background: "var(--mf-content)", border: "1px solid var(--mf-secondary)" }}>
            <p style={{ marginTop: 0 }}>Any content can go here.</p>
            <Button size="sm" onClick={close}>Close</Button>
        </div>
    )}
</Dropdown>
`}
        </CodeView>

        <div>
            <Dropdown trigger={({ toggle, isOpen }) => (
                <span onClick={toggle} style={{ cursor: "pointer", textDecoration: "underline" }}>
                    {isOpen ? "Close custom trigger" : "Open custom trigger"}
                </span>
            )}>
                {({ close }) => (
                    <div style={{ padding: "12px", background: "var(--mf-content)", border: "1px solid var(--mf-secondary)", minWidth: "220px" }}>
                        <p style={{ marginTop: 0 }}>Any content can go here.</p>
                        <Button size="sm" onClick={close}>Close</Button>
                    </div>
                )}
            </Dropdown>
        </div>

        <div style={{ marginBottom: "160px" }} />
    </Container>
    );
};

export default Buttons;