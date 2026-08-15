import { useState } from "react";
import { css } from "@emotion/react";
import { Form, Input } from "@maelstrom-futurism/form";
import { Button } from "@maelstrom-futurism/button";
import { ContentBox } from "@maelstrom-futurism/core";
import { Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";

const FormPage = () => {
    const [submittedValues, setSubmittedValues] = useState<string | null>(null);
    const [changeCount, setChangeCount] = useState(0);
    const [ajaxResult, setAjaxResult] = useState<string | null>(null);

    return (
        <Container>
            <h1>Form</h1>

            <p>
                Renders a plain <code>&lt;form/&gt;</code>. Pass <code>onSubmit</code> to handle
                submission — the native submit is already prevented for you.
            </p>

            <p>Found in <code>@maelstrom-futurism/form</code> and <code>maelstrom-futurism</code>.</p>

            <h2>Basic</h2>
            <CodeView>{`<Form onSubmit={(e) => {
    const data = new FormData(e.currentTarget);
    console.log(data.get("name"));
}}>
    <Input name="name" label="Name" />
    <Button type="submit">Submit</Button>
</Form>`}</CodeView>

            <Form
                onSubmit={(e) => {
                    const data = new FormData(e.currentTarget);
                    setSubmittedValues(String(data.get("name") || "(empty)"));
                }}
            >
                <Input name="name" label="Name" />
                <div css={css`margin-top: 12px;`}>
                    <Button type="submit" variant="primary">Submit</Button>
                </div>
            </Form>
            {submittedValues !== null && <p>Submitted name: <code>{submittedValues}</code></p>}

            <h2>Confirm Before Leaving with Unsaved Changes</h2>
            <p>
                Pass <code>confirmLeaveOnDirty</code> to prompt the browser's native "leave site?"
                confirmation if the visitor tries to close the tab or navigate away while the form
                has unsaved changes. Dirty state is tracked automatically from any{" "}
                <code>input</code>/<code>change</code> event bubbling up from a form control, and is
                cleared again on submit.
            </p>
            <p>
                Browsers block scripted access to (and automated testing of) the native beforeunload
                dialog itself, so this demo instead surfaces the same dirty state the component uses
                internally — type in the field below and watch the indicator flip, which is exactly
                the signal that arms the "leave site?" prompt.
            </p>

            <CodeView>{`<Form confirmLeaveOnDirty onSubmit={handleSubmit}>
    <Input name="draft" label="Draft title" />
    <Button type="submit">Save</Button>
</Form>`}</CodeView>

            <ContentBox>
                <Form
                    confirmLeaveOnDirty
                    onChange={() => setChangeCount((c) => c + 1)}
                    onSubmit={() => setChangeCount(0)}
                >
                    <Input name="draft" label="Draft title" />
                    <div css={css`margin-top: 12px; display: flex; align-items: center; gap: 12px;`}>
                        <Button type="submit" variant="primary">Save</Button>
                        <span>
                            {changeCount > 0
                                ? "Unsaved changes — closing the tab now would prompt to confirm."
                                : "No unsaved changes."}
                        </span>
                    </div>
                </Form>
            </ContentBox>

            <h2>Ajax Submit</h2>
            <p>
                Pass <code>onSubmitAjax</code> to intercept submission with an async function
                instead of <code>onSubmit</code>. While it's pending, any submit-type{" "}
                <code>Button</code> among the form's children is automatically put into its{" "}
                <code>loading</code> state. Resolve with <code>{"{ fieldErrors }"}</code> (keyed by
                field <code>name</code>) to surface validation errors on the matching{" "}
                <code>Input</code>/<code>TextArea</code> — this demo's fake server always rejects{" "}
                <code>taken</code> as a username, after a 1.5s simulated delay.
            </p>

            <CodeView>{`<Form
    onSubmitAjax={async (e) => {
        const data = new FormData(e.currentTarget);
        const username = String(data.get("username"));

        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (username === "taken") {
            return { fieldErrors: { username: "That username is already taken." } };
        }

        setAjaxResult(\`Account created for "\${username}"\`);
    }}
>
    <Input name="username" label="Username" />
    <Button type="submit">Create Account</Button>
</Form>`}</CodeView>

            <Form
                onSubmitAjax={async (e) => {
                    const data = new FormData(e.currentTarget);
                    const username = String(data.get("username") || "");

                    await new Promise((resolve) => { setTimeout(resolve, 1500); });

                    if (username === "taken") {
                        setAjaxResult(null);
                        return { fieldErrors: { username: "That username is already taken." } };
                    }

                    setAjaxResult(`Account created for "${username}"`);
                    return undefined;
                }}
            >
                <Input name="username" label="Username" defaultValue="taken" />
                <div css={css`margin-top: 12px;`}>
                    <Button type="submit" variant="primary">Create Account</Button>
                </div>
            </Form>
            {ajaxResult && <p>{ajaxResult}</p>}

            <div style={{ marginBottom: "160px" }} />
        </Container>
    );
};

export default FormPage;
