import { ReactNode, useState } from "react";
import { Container } from "@maelstrom-futurism/layout";
import { ContentBox } from "@maelstrom-futurism/core";
import { Radio, RadioGroup } from "@maelstrom-futurism/form";

import CodeView from "../components/CodeView";

const RadioPage = (): ReactNode => {
    const [controlledValue, setControlledValue] = useState("b");

    return (
        <Container>
            <h1>Radio &amp; RadioGroup</h1>

            <p>
                Radio buttons allow users to select a single option from a set. The <code>RadioGroup</code> component
                is the primary way to render a group of options, while <code>Radio</code> can be used standalone
                for custom layouts.
            </p>

            <h2>RadioGroup</h2>

            <CodeView>{`import { RadioGroup } from "@maelstrom-futurism/form";

<RadioGroup
    name="colour"
    label="Favourite Colour"
    options={[
        { value: "red", label: "Red" },
        { value: "green", label: "Green" },
        { value: "blue", label: "Blue" },
    ]}
/>`}</CodeView>

            <RadioGroup
                name="colour"
                label="Favourite Colour"
                options={[
                    { value: "red", label: "Red" },
                    { value: "green", label: "Green" },
                    { value: "blue", label: "Blue" },
                ]}
            />

            <h2>With Help Text</h2>

            <p>
                Use the <code>helpText</code> prop to provide additional context below the group, just like the
                Input component.
            </p>

            <CodeView>{`<RadioGroup
    name="notify"
    label="Notification Frequency"
    helpText="You can change this at any time in your account settings."
    options={[
        { value: "realtime", label: "Real-time" },
        { value: "daily", label: "Daily digest" },
        { value: "weekly", label: "Weekly digest" },
        { value: "never", label: "Never" },
    ]}
    defaultValue="daily"
/>`}</CodeView>

            <RadioGroup
                name="notify"
                label="Notification Frequency"
                helpText="You can change this at any time in your account settings."
                options={[
                    { value: "realtime", label: "Real-time" },
                    { value: "daily", label: "Daily digest" },
                    { value: "weekly", label: "Weekly digest" },
                    { value: "never", label: "Never" },
                ]}
                defaultValue="daily"
            />

            <h2>Required Field</h2>

            <p>Mark a group as required with the <code>required</code> prop. An asterisk is appended to the group label.</p>

            <CodeView>{`<RadioGroup
    name="plan"
    label="Select a Plan"
    required
    options={[
        { value: "free", label: "Free" },
        { value: "pro", label: "Pro" },
        { value: "enterprise", label: "Enterprise" },
    ]}
/>`}</CodeView>

            <RadioGroup
                name="plan"
                label="Select a Plan"
                required
                options={[
                    { value: "free", label: "Free" },
                    { value: "pro", label: "Pro" },
                    { value: "enterprise", label: "Enterprise" },
                ]}
            />

            <h2>Disabled Options</h2>

            <p>Individual options can be disabled by setting <code>disabled: true</code> on the option object.</p>

            <CodeView>{`<RadioGroup
    name="tier"
    label="Account Tier"
    options={[
        { value: "basic", label: "Basic" },
        { value: "standard", label: "Standard" },
        { value: "premium", label: "Premium (unavailable)", disabled: true },
    ]}
    defaultValue="basic"
/>`}</CodeView>

            <RadioGroup
                name="tier"
                label="Account Tier"
                options={[
                    { value: "basic", label: "Basic" },
                    { value: "standard", label: "Standard" },
                    { value: "premium", label: "Premium (unavailable)", disabled: true },
                ]}
                defaultValue="basic"
            />

            <h2>Controlled Component</h2>

            <p>
                Pass <code>value</code> and <code>onChange</code> to use RadioGroup as a controlled component.
                The current selection is shown below.
            </p>

            <CodeView>{`const [value, setValue] = useState("b");

<RadioGroup
    name="controlled"
    label="Controlled Group"
    value={value}
    onChange={setValue}
    options={[
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
        { value: "c", label: "Option C" },
    ]}
/>`}</CodeView>

            <RadioGroup
                name="controlled"
                label="Controlled Group"
                value={controlledValue}
                onChange={setControlledValue}
                options={[
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B" },
                    { value: "c", label: "Option C" },
                ]}
            />
            <p>Selected value: <code>{controlledValue}</code></p>

            <h2>Inside a ContentBox</h2>

            <p>RadioGroups work inside <code>ContentBox</code> elements. The label inherits the background colour to keep styling consistent.</p>

            <CodeView>{`import { ContentBox } from "@maelstrom-futurism/core";
import { RadioGroup } from "@maelstrom-futurism/form";

<ContentBox>
    <h3>Subscription Options</h3>
    <RadioGroup
        name="subscription"
        label="Billing Cycle"
        helpText="Annual billing saves 20%."
        options={[
            { value: "monthly", label: "Monthly" },
            { value: "annual", label: "Annual" },
        ]}
        defaultValue="monthly"
    />
</ContentBox>`}</CodeView>

            <ContentBox>
                <h3>Subscription Options</h3>
                <RadioGroup
                    name="subscription"
                    label="Billing Cycle"
                    helpText="Annual billing saves 20%."
                    options={[
                        { value: "monthly", label: "Monthly" },
                        { value: "annual", label: "Annual" },
                    ]}
                    defaultValue="monthly"
                />
            </ContentBox>

            <h2>Standalone Radio</h2>

            <p>
                Use the <code>Radio</code> component directly when you need to compose a custom layout
                or mix radio buttons with other content.
            </p>

            <CodeView>{`import { Radio } from "@maelstrom-futurism/form";

<Radio name="standalone" value="yes" label="Yes, I agree to the terms" />
<Radio name="standalone" value="no" label="No, I do not agree" />`}</CodeView>

            <Radio name="standalone" value="yes" label="Yes, I agree to the terms" />
            <Radio name="standalone" value="no" label="No, I do not agree" />

            <br /><br /><br /><br />
        </Container>
    );
};

export default RadioPage;
