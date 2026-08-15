import { ReactNode } from "react";
import { Accordion, AccordionItem, Container } from "@maelstrom-futurism/layout";

import CodeView from "../components/CodeView";

const AccordionPage = (): ReactNode => (
    <Container>
        <h1>Accordion</h1>

        <p>
            <code>Accordion</code>/<code>AccordionItem</code> render a vertically-stacked set of
            collapsible panels. By default only one item stays open at a time — opening one
            closes the rest — and each panel's height is animated with CSS{" "}
            <code>grid-template-rows</code> rather than a fixed pixel height.
        </p>

        <CodeView>{`import { Accordion, AccordionItem } from "@maelstrom-futurism/layout";

const FormControl = () => (
    <Accordion>
        <AccordionItem title="What is Maelstrom Futurism?">
            A React component library built around design tokens and CSS custom properties.
        </AccordionItem>
        <AccordionItem title="Is it themeable?">
            Yes — swap the theme via ThemeProvider and every component picks up the new tokens.
        </AccordionItem>
        <AccordionItem title="Does it support dark mode?">
            Yes, out of the box, using prefers-color-scheme or an explicit theme override.
        </AccordionItem>
    </Accordion>
);
`}</CodeView>

        <Accordion>
            <AccordionItem title="What is Maelstrom Futurism?">
                A React component library built around design tokens and CSS custom properties.
            </AccordionItem>
            <AccordionItem title="Is it themeable?">
                Yes — swap the theme via ThemeProvider and every component picks up the new tokens.
            </AccordionItem>
            <AccordionItem title="Does it support dark mode?">
                Yes, out of the box, using prefers-color-scheme or an explicit theme override.
            </AccordionItem>
        </Accordion>

        <h2>Default Open</h2>
        <p>
            Pass <code>defaultOpen</code> to an <code>AccordionItem</code> to have it expanded on
            first render.
        </p>

        <CodeView>{`<Accordion>
    <AccordionItem title="Step 1" defaultOpen>
        This step starts expanded.
    </AccordionItem>
    <AccordionItem title="Step 2">
        This one starts collapsed.
    </AccordionItem>
</Accordion>`}</CodeView>

        <Accordion>
            <AccordionItem title="Step 1" defaultOpen>
                This step starts expanded.
            </AccordionItem>
            <AccordionItem title="Step 2">
                This one starts collapsed.
            </AccordionItem>
        </Accordion>

        <h2>Allow Multiple Open</h2>
        <p>
            By default, opening one item closes any other open item in the same{" "}
            <code>Accordion</code>. Pass <code>allowMultiple</code> to let several items stay
            open at once.
        </p>

        <CodeView>{`<Accordion allowMultiple>
    <AccordionItem title="Section A">Content A</AccordionItem>
    <AccordionItem title="Section B">Content B</AccordionItem>
    <AccordionItem title="Section C">Content C</AccordionItem>
</Accordion>`}</CodeView>

        <Accordion allowMultiple>
            <AccordionItem title="Section A">Content A</AccordionItem>
            <AccordionItem title="Section B">Content B</AccordionItem>
            <AccordionItem title="Section C">Content C</AccordionItem>
        </Accordion>

        <h2>Standalone Item</h2>
        <p>
            An <code>AccordionItem</code> also works on its own, without an enclosing{" "}
            <code>Accordion</code>, managing its own open state.
        </p>

        <CodeView>{`<AccordionItem title="Standalone panel">
    This item manages its own open state.
</AccordionItem>`}</CodeView>

        <AccordionItem title="Standalone panel">
            This item manages its own open state.
        </AccordionItem>

        <br/><br/><br/><br/>
    </Container>
);

export default AccordionPage;
