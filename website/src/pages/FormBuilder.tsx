import { ReactNode } from "react";
import { Container } from "@maelstrom-futurism/layout";
// import FormBuilder from '@maelstrom-futurism/form';

import CodeView from "../components/CodeView";

const FormBuilderPage = (): ReactNode => {
    return (
        <Container>
            <h1>Form Builder</h1>

            <p>FormBuilder, from the <code>@maelstrom-futurism/form</code> package, allows you to quickly
            construct simple forms based on the fields required. If you care more about having <i>something</i>
            up than about proper presentation it's a great prototyping tool.</p>

            <CodeView>{`import FormBuilder from "@maelstrom-futurism/form";

<FormBuilder model={[{
    label: 'Name',
    name: 'name',
    contentType: 'text',
},{
    label: 'Address',
    name: 'address',
    contentType: 'text',
}]}
onSubmit={values => console.log(values)}
/>`}
            </CodeView>
{/*
            <FormBuilder model={[{
                label: 'Name',
                name: 'name',
                contentType: 'text',
            }, {
                label: 'Address',
                name: 'address',
                contentType: 'text',
            }]}
            onSubmit={values => console.log(values)}/>
*/}
        </Container>
    );
}

export default FormBuilderPage;