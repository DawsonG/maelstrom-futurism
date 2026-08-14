import { useState, ReactNode } from "react";
import { Button } from "@maelstrom-futurism/button";
import { Container } from "@maelstrom-futurism/layout";
import { Modal, Placement } from "@maelstrom-futurism/modal";

import CodeView from "../components/CodeView";

const placements: Placement[] = ["left", "right", "top", "bottom"];

const ModalPage = (): ReactNode => {
    // const [toggle, Modal] = useModal();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [drawerPlacement, setDrawerPlacement] = useState<Placement | null>(null);

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

            <h2>Drawer</h2>
            <p>
                Pass <code>variant="drawer"</code> and a <code>placement</code>
                (<code>"left" | "right" | "top" | "bottom"</code>) to anchor the panel to a
                viewport edge and slide it in from that side instead of the default fade+scale.
            </p>

            <CodeView>{`import { useState } from "react";
import { Modal } from "@maelstrom-futurism/modal";

const [isVisible, setIsVisible] = useState(false);

<Button onClick={() => setIsVisible(true)}>Open drawer</Button>
<Modal title="Drawer Title" variant="drawer" placement="right"
    isShowing={isVisible} hide={() => setIsVisible(false)}>
    Contents of Drawer
</Modal>
`}</CodeView>

            {placements.map((placement) => (
                <Button key={placement} onClick={() => setDrawerPlacement(placement)}>
                    Open {placement} drawer
                </Button>
            ))}

            <Modal
                title="Drawer Title"
                variant="drawer"
                placement={drawerPlacement ?? "right"}
                isShowing={drawerPlacement !== null}
                hide={() => setDrawerPlacement(null)}
            >
                Contents of Drawer
            </Modal>

            <br/><br/><br/><br/>
        </Container>
    );
};

export default ModalPage;