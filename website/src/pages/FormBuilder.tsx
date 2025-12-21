import { ReactNode } from "react";

import CodeView from "../components/CodeView";
import { Container } from "@maelstrom-futurism/layout";

const FormBuilderPage = (): ReactNode => {
    return (
        <Container>
            <h1>Form Builder</h1>

            <p>FormBuilder, from the <code>@maelstrom-futurism/form</code> package, allows you to quickly
            construct simple forms based on the fields required. If you care more about having <i>something</i>
            up than about proper presentation it's a great prototyping tool.</p>

            <CodeView>{`import FormBuilder from "@maelstrom-futurism/form";

`}
            </CodeView>
        </Container>
    );
}

export default FormBuilderPage;