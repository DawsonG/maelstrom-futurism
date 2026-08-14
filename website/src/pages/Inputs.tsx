import { ReactNode, useState } from "react";
import { DateInput, Input, TextArea } from "@maelstrom-futurism/form";
import { Container } from "@maelstrom-futurism/layout";
import { ContentBox } from "@maelstrom-futurism/core";

import CodeView from "../components/CodeView";

const Inputs = (): ReactNode => {
    const [autosizeValue, setAutosizeValue] = useState("");

    return (
        <Container>
            <h1>Inputs</h1>

            <p>Inputs are based around large size, for easy readability, and responsiveness to user events.  They are based
                on Google's MaterialUI system but all behavior is handled entirely with CSS. Based on
                <a href="https://github.com/LeonGeldsch/css_material_input/" target="_blank">CSS Material Input</a>
                by Leon Geldsch.
            </p>

            <CodeView>{`import { Input } from "@maelstrom-futurism/input";

const FormControl = () => (
    <Input variant="material" name="test" label="Material Input" type="text" />
);
`}</CodeView>

            <Input variant="material" name="test" label="Material Input" type="text" />

<CodeView>{`import { Input } from "@maelstrom-futurism/input";

const FormControl = () => (
    <Input variant="normal" name="test 2" label="Normal Input" type="text" />
    <Input variant="normal" name="test 21" label="Clearable Input" clearable type="text" />
);
`}</CodeView>

            <Input variant="normal" name="test 2" label="Normal Input" type="text" />
            <Input variant="normal" name="test 21" label="Clearable Input" clearable type="text" />

<CodeView>{`import { TextArea } from "@maelstrom-futurism/input";

const FormControl = () => (
    <TextArea name="textarea" label="Normal Textarea" onChange={() => null} />
);
`}</CodeView>
            <TextArea name="textarea" label="Normal Textarea" onChange={() => null} />

            <p>
                Inputs can also be used inside of content boxes and other elements with set
                background colors. Note: You may have to explicitly set the parent element's
                background color to avoid the border line appearing through the label text.
            </p>

            <CodeView>{`import { Input } from "@maelstrom-futurism/input";
import { ContentBox } from "@maelstrom-futurism/core";

<ContentBox>
    <h2>I'm a ContentBox</h2>
    <Input variant="normal" name="test 2" label="Normal Input in Content Box" type="text" />
</ContentBox>`}</CodeView>

            <ContentBox>
                <h2>I'm a ContentBox</h2>
                <Input variant="normal" name="test 2" label="Normal Input in Content Box" type="text" />
            </ContentBox>

            <p>
                Inputs can also have help text (<code>helpText</code>) associated with them to guide
                users. They also accept all HTML5 <code>type</code> values.
            </p>

            <Input name="telephone" variant="normal" type="tel" label="Telephone" helpText="Only used for emergencies" />
            <Input name="email" variant="material" type="email" label="Email" helpText="Must be able to receive emails to complete registration" />

            <h2>Validation States</h2>
            <p>
                Inputs accept a <code>validationState</code> prop (<code>"alert"</code>, <code>"warning"</code>, or <code>"success"</code>)
                and an optional <code>validationMessage</code> to display feedback below the field.
            </p>

            <CodeView>{`<Input variant="normal" name="username" type="text" label="Username"
    validationState="alert"
    validationMessage="Username is already taken" />

<Input variant="normal" name="age" type="number" label="Age"
    validationState="warning"
    validationMessage="You must be 18+ to proceed" />

<Input variant="normal" name="email" type="email" label="Email"
    validationState="success"
    validationMessage="Looks good!" />`}</CodeView>

            <Input variant="normal" name="v-error" type="text" label="Username"
                validationState="alert"
                validationMessage="Username is already taken" />
            <Input variant="normal" name="v-warning" type="number" label="Age"
                validationState="warning"
                validationMessage="You must be 18+ to proceed" />
            <Input variant="normal" name="v-success" type="email" label="Email"
                validationState="success"
                validationMessage="Looks good!" />

            <p>Validation states also work on the material variant and on <code>TextArea</code>:</p>

            <CodeView>{`<Input variant="material" name="card" type="text" label="Card Number"
    validationState="alert"
    validationMessage="Invalid card number" />

<TextArea name="bio" label="Bio"
    validationState="warning"
    validationMessage="Keep it under 200 characters" />`}</CodeView>

            <Input variant="material" name="v-material" type="text" label="Card Number"
                validationState="alert"
                validationMessage="Invalid card number" />
            <TextArea name="v-textarea" label="Bio"
                validationState="warning"
                validationMessage="Keep it under 200 characters" />

            <h2>Special Input Types</h2>
            <p>Input can also wrap DateTime inputs</p>

            <CodeView>{`<DateInput type="date" name="ourDate" />
<DateInput type="time" name="ourTime" />`}</CodeView>

            <DateInput type="date" name="ourDate" />
            <DateInput type="time" name="ourTime" />

            <h2>Autosize Textarea</h2>
            <p>
                Pass <code>autosize</code> to a <code>TextArea</code> to have it grow (and shrink)
                to fit its content instead of scrolling.
            </p>

            <CodeView>{`import { useState } from "react";
import { TextArea } from "@maelstrom-futurism/input";

const FormControl = () => {
    const [value, setValue] = useState("");

    return (
        <TextArea name="autosize" label="Autosize Textarea" autosize
            value={value} onChange={(e) => setValue(e.target.value)} />
    );
};
`}</CodeView>

            <TextArea name="autosize" maxLength={1000} showCharacterCount={true} label="Autosize Textarea" autosize
                value={autosizeValue} onChange={(e) => setAutosizeValue(e.target.value)} />

            <h2>Auto-select on Focus</h2>
            <p>
                Pass <code>autoSelectOnFocus</code> to an <code>Input</code> to select its entire value
                as soon as it's focused, making it easy to copy. It's only active when <code>readOnly</code>
                is also set.
            </p>

            <CodeView>{`<Input variant="normal" name="share-link" type="text" label="Share Link"
    readOnly autoSelectOnFocus value="https://mf.osmstudios.com/asdf/jkl123" />`}</CodeView>

            <Input variant="normal" name="share-link" type="text" label="Share Link"
                readOnly autoSelectOnFocus value="https://mf.osmstudios.com/asdf/jkl123" />

            <br/><br/><br/><br/>
        </Container>
    );
}

export default Inputs;