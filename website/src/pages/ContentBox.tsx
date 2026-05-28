import { css } from "@emotion/react";
import { ContentBox, Pill } from "@maelstrom-futurism/core";
import { Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";

const ContentBoxPage = () => (
    <Container>
        <h1>Box and ContentBox</h1>
        <p>
            Boxes are the simplest unit of styling inside Maelstrom-Futurism. They are essentially
            a special &lt;div/&gt; tag with a couple of style helpers.  They can be used by
        </p>

        <p>Found in <code>@maelstrom-futurism/core</code> and <code>maelstrom-futurism</code>.</p>

        <h2>ContentBox</h2>
        <CodeView>{`<ContentBox variant='alert'>This is an alert or error.</ContentBox>
<ContentBox variant='warning'>This is a warning.</ContentBox>
<ContentBox variant='info'>This is an info.</ContentBox>
<ContentBox variant='success'>This is a success.</ContentBox>
<ContentBox>Normal ContentBox with no variant assigned.</ContentBox>`}</CodeView>

        <ContentBox variant='alert'>This is an alert or error.</ContentBox>
        <ContentBox variant='warning'>This is a warning.</ContentBox>
        <ContentBox variant='info'>This is an info.</ContentBox>
        <ContentBox variant='success'>This is a success.</ContentBox>
        <ContentBox>Normal ContentBox with no variant assigned.</ContentBox>
        <ContentBox styles={css`border: var(--nord-polar-1);color: red;`}>This ContentBox has some custom overrides applied.</ContentBox>

        <h2>Pills</h2>
        <Pill variant='alert'>Alert | Error</Pill>
        <Pill variant='warning'>Warning</Pill>
        <Pill variant='info'>Info</Pill>
        <Pill variant='success'>Success</Pill>

        <h2>Pills with Overwrite</h2>
        <Pill styles={css`border: none;background: red;color: white;`}>Custom</Pill>
    </Container>
);

export default ContentBoxPage;