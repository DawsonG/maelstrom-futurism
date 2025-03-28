import { Input, TextArea } from "@maelstrom-futurism/input";
import { Container } from "@maelstrom-futurism/layout";

const Inputs = (): JSX.Element => {
    return (
        <Container>
            <h1>Inputs</h1>


            <Input variant="material" name="test" label="Test Inputs" type="text" />

            <Input variant="normal" name="test 2" label="Test Inputs 2" type="text" />

            <TextArea name="textarea" label="Test Textarea" onChange={() => null} />
        </Container>
    );
}

export default Inputs;