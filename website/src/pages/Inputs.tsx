import InputWrapper from "@maelstrom-futurism/input";
import { Container } from "@maelstrom-futurism/layout";

const Inputs = (): JSX.Element => {
    return (
        <Container>
            <InputWrapper variant="material" name="test" label="Test Inputs" type="text" />

            <InputWrapper variant="normal" name="test 2" label="Test Inputs 2" type="text" />
        </Container>
    );
}

export default Inputs;