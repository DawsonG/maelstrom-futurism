import { ContentBox } from "@maelstrom-futurism/core";
import { Container } from "@maelstrom-futurism/layout";

const ContentBoxPage = () => (
    <Container>
        <ContentBox variant='alert'>This is an alert.</ContentBox>

        <ContentBox variant='error'>This is an error.</ContentBox>

        <ContentBox variant='warning'>This is an warning.</ContentBox>

        <ContentBox variant='info'>This is an info.</ContentBox>

        <ContentBox variant='success'>This is an success.</ContentBox>
    </Container>
);

export default ContentBoxPage;