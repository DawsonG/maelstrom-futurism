import { Button } from "@maelstrom-futurism/button";
import { Container } from "@maelstrom-futurism/layout";
import { useModal } from "@maelstrom-futurism/modal";
import { ReactNode } from "react";

const ModalPage = (): ReactNode => {
    const [toggle, Modal] = useModal();

    return (
        <Container>
            <h1>Modal</h1>

            <p></p>

            <Button onClick={toggle}>Open modal</Button>
            <Modal title="Modal Title">
                Contents of Modal
            </Modal>
        </Container>
    );
};

export default ModalPage;