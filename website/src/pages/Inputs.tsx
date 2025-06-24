import { Input, TextArea } from "@maelstrom-futurism/input";
import { Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";
import { ContentBox } from "@maelstrom-futurism/core";

const Inputs = (): JSX.Element => {
    return (
        <Container>
            <h1>Inputs</h1>

            <p>Inputs are based around large size, for easy readability, and responsiveness to user events.  They are based
                on Google's MaterialUI system but all behavior is handled entirely with CSS. Based on
                <a href="https://github.com/LeonGeldsch/css_material_input/" target="_blank">CSS Material Input</a>
                by Leon Geldsch.
            </p>

            <CodeView>{`import { Input } from "@maelstrom-futurism/input";

const FormControl = () => (
    <Input variant="material" name="test" label="Material Input" type="text" />
);
`}</CodeView>

            <Input variant="material" name="test" label="Material Input" type="text" />

<CodeView>{`import { Input } from "@maelstrom-futurism/input";

const FormControl = () => (
    <Input variant="normal" name="test 2" label="Normal Input" type="text" />
);
`}</CodeView>

            <Input variant="normal" name="test 2" label="Normal Input" type="text" />

<CodeView>{`import { TextArea } from "@maelstrom-futurism/input";

const FormControl = () => (
    <TextArea name="textarea" label="Normal Textarea" onChange={() => null} />
);
`}</CodeView>
            <TextArea name="textarea" label="Normal Textarea" onChange={() => null} />

            <p>
                Inputs can also be used inside of content boxes and other elements with set
                background colors.
            </p>

            <CodeView>{`import { Input } from "@maelstrom-futurism/input";
import { ContentBox } from "@maelstrom-futurism/core";

<ContentBox>
    <h2>I'm a ContentBox</h2>
    <Input variant="normal" name="test 2" label="Normal Input in Content Box" type="text" />
</ContentBox>`}</CodeView>

            <ContentBox>
                <h2>I'm a ContentBox</h2>
                <Input variant="normal" name="test 2" label="Normal Input in Content Box" type="text" />
            </ContentBox>
        </Container>
    );
}

export default Inputs;