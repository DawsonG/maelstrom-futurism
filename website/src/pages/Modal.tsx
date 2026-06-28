import { useState, ReactNode } from "react";
import { Button } from "@maelstrom-futurism/button";
import { Container } from "@maelstrom-futurism/layout";
import { Modal } from "@maelstrom-futurism/modal";

import CodeView from "../components/CodeView";

const ModalPage = (): ReactNode => {
    // const [toggle, Modal] = useModal();
    const [isVisible, setIsVisible] = useState<boolean>(false);

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

            <Button onClick={() => setIsVisible(true)}>Open modal</Button>
            <Modal title="Modal Title" size="xl" isShowing={isVisible} hide={() => setIsVisible(false)}>
                Contents of Modal
            </Modal>
        </Container>
    );
};

export default ModalPage;