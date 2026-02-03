import { Button } from "@maelstrom-futurism/button";
import { Container } from "@maelstrom-futurism/layout";
import { useModal } from "@maelstrom-futurism/modal";
import { ReactNode } from "react";
import CodeView from "../components/CodeView";

const ModalPage = (): ReactNode => {
    const [toggle, Modal] = useModal();

    return (
        <Container>
            <h1>Modal</h1>

            <p></p>

            <CodeView>{`
import { useModal } from "@maelstrom-futurism/modal";

...

const [toggle, Modal] = useModal();

return (
    <Button onClick={toggle}>Open modal</Button>
    <Modal title="Modal Title">
        Contents of Modal
    </Modal>
);
`}</CodeView>

            <Button onClick={toggle}>Open modal</Button>
            <Modal title="Modal Title">
                Contents of Modal
            </Modal>
        </Container>
    );
};

export default ModalPage;