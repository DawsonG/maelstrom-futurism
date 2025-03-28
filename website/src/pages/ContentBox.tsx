import { ContentBox } from "@maelstrom-futurism/core";
import { Container } from "@maelstrom-futurism/layout";

const ContentBoxPage = () => (
    <Container>
        <h1>Box and ContentBox</h1>
        <p>
            Boxes are the simplest unit of styling inside Maelstrom-Futurism. They are essentially
            a special &lt;div/&gt; tag with a couple of style helpers.  By 
        </p>

        <p>Found in <code>@maelstrom-futurism/core</code> and <code>maelstrom-futurism</code>.</p>

        <ContentBox variant='alert'>This is an alert.</ContentBox>

        <ContentBox variant='error'>This is an error.</ContentBox>

        <ContentBox variant='warning'>This is a warning.</ContentBox>

        <ContentBox variant='info'>This is an info.</ContentBox>

        <ContentBox variant='success'>This is a success.</ContentBox>
    </Container>
);

export default ContentBoxPage;