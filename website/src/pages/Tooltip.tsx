import { Container } from "@maelstrom-futurism/layout";
import { Tooltip } from "@maelstrom-futurism/tooltip";

import CodeView from "../components/CodeView";

function TooltipPage() {
    return (
        <Container>
            <h1>Tooltip</h1>
            
            <p>Buncha text to use for things.</p>

            <CodeView>
{`<Tooltip content="This is a tooltip" position="top | right | bottom | left" trigger="hover">Trigger</Tooltip>`}
            </CodeView>

            <Tooltip content="This is a tooltip" position="top" trigger="hover">Tooltip on Top</Tooltip>&nbsp;|&nbsp;
            <Tooltip content="This is a tooltip" position="right" trigger="hover">Tooltip on Right</Tooltip>&nbsp;|&nbsp;
            <Tooltip content="This is a tooltip" position="bottom" trigger="hover">Tooltip on Bottom</Tooltip>&nbsp;|&nbsp;
            <Tooltip content="This is a tooltip" position="left" trigger="hover">Tooltip on Left</Tooltip>
        </Container>
    );
}

export default TooltipPage;