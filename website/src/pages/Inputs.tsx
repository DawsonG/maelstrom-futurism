import { ReactNode, useState } from "react";
import { Input, TextArea } from "@maelstrom-futurism/form";
import { Container } from "@maelstrom-futurism/layout";
import { ContentBox } from "@maelstrom-futurism/core";
import { Button } from "@maelstrom-futurism/button";

import CodeView from "../components/CodeView";

const Inputs = (): ReactNode => {
    const [autosizeValue, setAutosizeValue] = useState("");
    const [submitCount, setSubmitCount] = useState(0);
    const [usernameError, setUsernameError] = useState("");
    const [productCodeError, setProductCodeError] = useState("");
    const [workEmailError, setWorkEmailError] = useState("");

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

            <h2>Enter-to-submit Textarea</h2>
            <p>
                Pass <code>submitOnEnter</code> to a <code>TextArea</code> to submit its enclosing
                form on Ctrl/Cmd+Enter, without stopping a plain Enter from adding a new line.
            </p>

            <CodeView>{`import { TextArea } from "@maelstrom-futurism/input";

const FormControl = () => (
    <form onSubmit={(e) => { e.preventDefault(); /* handle submit */ }}>
        <TextArea name="message" label="Message (Ctrl/Cmd+Enter to submit)" submitOnEnter />
    </form>
);
`}</CodeView>

            <form onSubmit={(e) => { e.preventDefault(); setSubmitCount((count) => count + 1); }}>
                <TextArea name="message" label="Message (Ctrl/Cmd+Enter to submit)" submitOnEnter />
            </form>
            <p>Submitted {submitCount} time{submitCount === 1 ? "" : "s"}</p>

            <h2>Leading &amp; Suffix Icons</h2>
            <p>
                Pass <code>leadingIcon</code> and/or <code>suffixIcon</code> (any <code>ReactNode</code>) to
                render content at either end of the field. For <code>type="password"</code>, a built-in
                show/hide toggle is used automatically as the suffix when <code>suffixIcon</code> isn't provided.
            </p>

            <CodeView>{`<Input variant="normal" name="search" type="text" label="Search"
    leadingIcon={<span>🔍</span>} />

<Input variant="normal" name="amount" type="number" label="Amount"
    leadingIcon={<span>$</span>} suffixIcon={<span>USD</span>} />

<Input variant="normal" name="password" type="password" label="Password" />`}</CodeView>

            <Input variant="normal" name="search" type="text" label="Search" leadingIcon={<span>🔍</span>} />
            <Input variant="normal" name="amount" type="number" label="Amount"
                leadingIcon={<span>$</span>} suffixIcon={<span>USD</span>} />
            <Input variant="normal" name="password" type="password" label="Password" />

            <h2>URL Prefix</h2>
            <p>
                For <code>type="url"</code>, the field automatically prepends <code>https://</code> to
                the value as the user types, unless the value already includes a protocol (or the user
                is in the middle of typing one out).
            </p>

            <CodeView>{`<Input variant="normal" name="website" type="url" label="Website"
    onChange={(e) => console.log(e.target.value)} />`}</CodeView>

            <Input variant="normal" name="website" type="url" label="Website" />

            <h2>Custom Error Messages</h2>
            <p>
                Pass <code>errorMessages</code> to an <code>Input</code> or <code>TextArea</code> to
                override the browser's default validation text. It's keyed by the native{" "}
                <code>ValidityState</code> flag that's currently failing (e.g. <code>valueMissing</code>,{" "}
                <code>typeMismatch</code>, <code>patternMismatch</code>), and applied via{" "}
                <code>setCustomValidity()</code> so it still participates in native form validation and{" "}
                <code>:invalid</code> styling. Click "Check" (or submit) to trigger native validation
                and reveal the message below.
            </p>

            <CodeView>{`<Input variant="normal" name="username2" type="text" label="Username" required
    errorMessages={{ valueMissing: "Please choose a username" }}
    validationState={usernameError ? "alert" : undefined}
    validationMessage={usernameError}
    onInvalid={(e) => { e.preventDefault(); setUsernameError(e.currentTarget.validationMessage); }}
    onChange={(e) => { if (e.currentTarget.checkValidity()) setUsernameError(""); }} />

<Input variant="normal" name="pattern-example" type="text" label="Product Code"
    pattern="[A-Z]{2}-[0-9]{4}"
    errorMessages={{ patternMismatch: "Format must be AB-1234" }}
    validationState={productCodeError ? "alert" : undefined}
    validationMessage={productCodeError}
    onInvalid={(e) => { e.preventDefault(); setProductCodeError(e.currentTarget.validationMessage); }}
    onChange={(e) => { if (e.currentTarget.checkValidity()) setProductCodeError(""); }} />`}</CodeView>

            <Input variant="normal" name="username2" type="text" label="Username" required
                errorMessages={{ valueMissing: "Please choose a username" }}
                validationState={usernameError ? "alert" : undefined}
                validationMessage={usernameError}
                onInvalid={(e) => { e.preventDefault(); setUsernameError(e.currentTarget.validationMessage); }}
                onChange={(e) => { if (e.currentTarget.checkValidity()) setUsernameError(""); }} />
            <Input variant="normal" name="pattern-example" type="text" label="Product Code"
                pattern="[A-Z]{2}-[0-9]{4}"
                errorMessages={{ patternMismatch: "Format must be AB-1234" }}
                validationState={productCodeError ? "alert" : undefined}
                validationMessage={productCodeError}
                onInvalid={(e) => { e.preventDefault(); setProductCodeError(e.currentTarget.validationMessage); }}
                onChange={(e) => { if (e.currentTarget.checkValidity()) setProductCodeError(""); }} />
            <Button type="button" variant="secondary" onClick={() => {
                (document.getElementsByName("username2")[0] as HTMLInputElement)?.reportValidity();
                (document.getElementsByName("pattern-example")[0] as HTMLInputElement)?.reportValidity();
            }}>Check</Button>

            <h2>Allowed Domains</h2>
            <p>
                Pass <code>allowedDomains</code> to restrict a <code>type="email"</code> or{" "}
                <code>type="url"</code> field to a set of hostnames (subdomains are accepted
                automatically). An optional <code>allowedDomainsMessage</code> customizes the
                validation text. Click "Check" to trigger native validation and reveal the message.
            </p>

            <CodeView>{`<Input variant="normal" name="work-email" type="email" label="Work Email"
    allowedDomains={["osmstudios.com"]}
    allowedDomainsMessage="Please use your osmstudios.com email address"
    validationState={workEmailError ? "alert" : undefined}
    validationMessage={workEmailError}
    onInvalid={(e) => { e.preventDefault(); setWorkEmailError(e.currentTarget.validationMessage); }}
    onChange={(e) => { if (e.currentTarget.checkValidity()) setWorkEmailError(""); }} />`}</CodeView>

            <Input variant="normal" name="work-email" type="email" label="Work Email"
                allowedDomains={["osmstudios.com"]}
                allowedDomainsMessage="Please use your osmstudios.com email address"
                validationState={workEmailError ? "alert" : undefined}
                validationMessage={workEmailError}
                onInvalid={(e) => { e.preventDefault(); setWorkEmailError(e.currentTarget.validationMessage); }}
                onChange={(e) => { if (e.currentTarget.checkValidity()) setWorkEmailError(""); }} />
            <Button type="button" variant="secondary" onClick={() => {
                (document.getElementsByName("work-email")[0] as HTMLInputElement)?.reportValidity();
            }}>Check</Button>

            <h2>Input Mask</h2>
            <p>
                Pass <code>mask</code> to reformat digits as they're typed against a pattern, where{" "}
                <code>0</code> marks a digit placeholder. <code>type="tel"</code> gets a US phone
                mask (<code>(000) 000-0000</code>) automatically when no <code>mask</code> is given.
            </p>

            <CodeView>{`<Input variant="normal" name="phone" type="tel" label="Phone Number" />

<Input variant="normal" name="ssn" type="text" label="SSN" mask="000-00-0000" />`}</CodeView>

            <Input variant="normal" name="phone" type="tel" label="Phone Number" />
            <Input variant="normal" name="ssn" type="text" label="SSN" mask="000-00-0000" />

            <br/><br/><br/><br/>
        </Container>
    );
}

export default Inputs;