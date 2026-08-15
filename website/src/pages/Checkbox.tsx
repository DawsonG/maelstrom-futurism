import { ReactNode, useState } from "react";
import { Container } from "@maelstrom-futurism/layout";
import { ContentBox } from "@maelstrom-futurism/core";
import { Checkbox, CheckboxGroup } from "@maelstrom-futurism/form";

import CodeView from "../components/CodeView";

const CheckboxPage = (): ReactNode => {
    const [controlledValues, setControlledValues] = useState<string[]>(["email"]);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
    const [darkMode, setDarkMode] = useState(false);
    const [switchGroupValues, setSwitchGroupValues] = useState<string[]>(["email"]);

    return (
        <Container>
            <h1>Checkbox &amp; CheckboxGroup</h1>

            <p>
                Checkboxes allow users to select one or more options independently. The <code>CheckboxGroup</code> component
                renders a labelled set of options, while <code>Checkbox</code> can be used standalone for single
                boolean fields like terms-of-service agreements.
            </p>

            <h2>CheckboxGroup</h2>

            <CodeView>{`import { CheckboxGroup } from "@maelstrom-futurism/form";

<CheckboxGroup
    name="interests"
    label="Areas of Interest"
    options={[
        { value: "frontend", label: "Frontend Development" },
        { value: "backend",  label: "Backend Development" },
        { value: "devops",   label: "DevOps & Infrastructure" },
        { value: "design",   label: "UI / UX Design" },
    ]}
    defaultValue={["frontend"]}
/>`}</CodeView>

            <CheckboxGroup
                name="interests"
                label="Areas of Interest"
                options={[
                    { value: "frontend", label: "Frontend Development" },
                    { value: "backend",  label: "Backend Development" },
                    { value: "devops",   label: "DevOps & Infrastructure" },
                    { value: "design",   label: "UI / UX Design" },
                ]}
                defaultValue={["frontend"]}
            />

            <h2>With Help Text</h2>

            <p>Use the <code>helpText</code> prop to provide additional context below the group.</p>

            <CodeView>{`<CheckboxGroup
    name="dietary"
    label="Dietary Requirements"
    helpText="Select all that apply. We'll use this to filter menu options."
    options={[
        { value: "vegetarian", label: "Vegetarian" },
        { value: "vegan",      label: "Vegan" },
        { value: "glutenFree", label: "Gluten Free" },
        { value: "dairyFree",  label: "Dairy Free" },
    ]}
/>`}</CodeView>

            <CheckboxGroup
                name="dietary"
                label="Dietary Requirements"
                helpText="Select all that apply. We'll use this to filter menu options."
                options={[
                    { value: "vegetarian", label: "Vegetarian" },
                    { value: "vegan",      label: "Vegan" },
                    { value: "glutenFree", label: "Gluten Free" },
                    { value: "dairyFree",  label: "Dairy Free" },
                ]}
            />

            <h2>Required Field</h2>

            <p>Mark a group as required with the <code>required</code> prop. An asterisk is appended to the group label.</p>

            <CodeView>{`<CheckboxGroup
    name="consent"
    label="Consent"
    required
    options={[
        { value: "data",      label: "I consent to data processing" },
        { value: "marketing", label: "I'd like to receive marketing emails" },
    ]}
/>`}</CodeView>

            <CheckboxGroup
                name="consent"
                label="Consent"
                required
                options={[
                    { value: "data",      label: "I consent to data processing" },
                    { value: "marketing", label: "I'd like to receive marketing emails" },
                ]}
            />

            <h2>Disabled Options</h2>

            <p>Individual options can be disabled by setting <code>disabled: true</code> on the option object.</p>

            <CodeView>{`<CheckboxGroup
    name="permissions"
    label="Permissions"
    options={[
        { value: "read",   label: "Read" },
        { value: "write",  label: "Write" },
        { value: "delete", label: "Delete (restricted)", disabled: true },
        { value: "admin",  label: "Admin (restricted)",  disabled: true },
    ]}
    defaultValue={["read", "write"]}
/>`}</CodeView>

            <CheckboxGroup
                name="permissions"
                label="Permissions"
                options={[
                    { value: "read",   label: "Read" },
                    { value: "write",  label: "Write" },
                    { value: "delete", label: "Delete (restricted)", disabled: true },
                    { value: "admin",  label: "Admin (restricted)",  disabled: true },
                ]}
                defaultValue={["read", "write"]}
            />

            <h2>Controlled Component</h2>

            <p>
                Pass <code>value</code> and <code>onChange</code> to use CheckboxGroup as a controlled component.
                The selected values are reflected below.
            </p>

            <CodeView>{`const [values, setValues] = useState<string[]>(["email"]);

<CheckboxGroup
    name="notifications"
    label="Notification Channels"
    value={values}
    onChange={setValues}
    options={[
        { value: "email", label: "Email" },
        { value: "sms",   label: "SMS" },
        { value: "push",  label: "Push Notification" },
        { value: "slack", label: "Slack" },
    ]}
/>`}</CodeView>

            <CheckboxGroup
                name="notifications"
                label="Notification Channels"
                value={controlledValues}
                onChange={setControlledValues}
                options={[
                    { value: "email", label: "Email" },
                    { value: "sms",   label: "SMS" },
                    { value: "push",  label: "Push Notification" },
                    { value: "slack", label: "Slack" },
                ]}
            />
            <p>Selected: <code>{controlledValues.length > 0 ? controlledValues.join(", ") : "none"}</code></p>

            <h2>Inside a ContentBox</h2>

            <p>CheckboxGroups work inside <code>ContentBox</code> elements, inheriting the background colour correctly.</p>

            <CodeView>{`import { ContentBox } from "@maelstrom-futurism/core";
import { CheckboxGroup } from "@maelstrom-futurism/form";

<ContentBox>
    <h3>Pizza Builder</h3>
    <CheckboxGroup
        name="toppings"
        label="Choose Toppings"
        helpText="Extra toppings are $1.50 each."
        value={toppings}
        onChange={setToppings}
        options={[
            { value: "cheese",    label: "Extra Cheese" },
            { value: "pepperoni", label: "Pepperoni" },
            { value: "mushrooms", label: "Mushrooms" },
            { value: "olives",    label: "Olives" },
        ]}
    />
    {toppings.length > 0 && <p>Your toppings: {toppings.join(", ")}</p>}
</ContentBox>`}</CodeView>

            <ContentBox>
                <h3>Pizza Builder</h3>
                <CheckboxGroup
                    name="toppings"
                    label="Choose Toppings"
                    helpText="Extra toppings are $1.50 each."
                    value={selectedToppings}
                    onChange={setSelectedToppings}
                    options={[
                        { value: "cheese",    label: "Extra Cheese" },
                        { value: "pepperoni", label: "Pepperoni" },
                        { value: "mushrooms", label: "Mushrooms" },
                        { value: "olives",    label: "Olives" },
                    ]}
                />
                {selectedToppings.length > 0 && <p>Your toppings: {selectedToppings.join(", ")}</p>}
            </ContentBox>

            <h2>Standalone Checkbox</h2>

            <p>
                Use the <code>Checkbox</code> component directly for single boolean fields — most commonly
                a terms-of-service agreement.
            </p>

            <CodeView>{`import { Checkbox } from "@maelstrom-futurism/form";

<Checkbox name="terms" value="accepted" label="I agree to the Terms of Service" />`}</CodeView>

            <Checkbox name="terms" value="accepted" label="I agree to the Terms of Service" />

            <h2>Standalone Checkbox — Controlled</h2>

            <CodeView>{`const [agreed, setAgreed] = useState(false);

<Checkbox
    name="terms-controlled"
    value="accepted"
    label="I agree to the Terms of Service"
    checked={agreed}
    onChange={(e) => setAgreed((e.target as HTMLInputElement).checked)}
/>
{agreed && <p>Thank you for agreeing!</p>}`}</CodeView>

            <Checkbox
                name="terms-controlled"
                value="accepted"
                label="I agree to the Terms of Service"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms((e.target as HTMLInputElement).checked)}
            />
            {agreedToTerms && <p>Thank you for agreeing!</p>}

            <h2>Standalone Checkbox — Material</h2>

            <CodeView>{`<Checkbox name="subscribe" value="yes" label="Subscribe to the newsletter" />
<Checkbox name="rememberMe" value="yes" label="Remember me on this device" />`}</CodeView>

            <Checkbox name="subscribe" value="yes" label="Subscribe to the newsletter" />
            <Checkbox name="rememberMe" value="yes" label="Remember me on this device" />

            <h2>Switch Variant</h2>

            <p>
                Pass <code>variant="switch"</code> to render a pill-shaped track+thumb toggle instead of
                the default checkbox. It renders with <code>role="switch"</code> and a live-updating
                <code>aria-checked</code>, and works the same whether controlled or uncontrolled.
            </p>

            <CodeView>{`const [darkMode, setDarkMode] = useState(false);

<Checkbox
    name="dark-mode"
    label="Dark mode"
    variant="switch"
    checked={darkMode}
    onChange={(e) => setDarkMode((e.target as HTMLInputElement).checked)}
/>
{darkMode && <p>Dark mode is on.</p>}`}</CodeView>

            <Checkbox
                name="dark-mode"
                label="Dark mode"
                variant="switch"
                checked={darkMode}
                onChange={(e) => setDarkMode((e.target as HTMLInputElement).checked)}
            />
            {darkMode && <p>Dark mode is on.</p>}

            <h3>Switch Variant in a Group</h3>

            <p><code>CheckboxGroup</code> accepts the same <code>variant</code> prop, applying it to every option.</p>

            <CodeView>{`const [values, setValues] = useState<string[]>(["email"]);

<CheckboxGroup
    name="notifications-switch"
    label="Notification Channels"
    variant="switch"
    value={values}
    onChange={setValues}
    options={[
        { value: "email", label: "Email" },
        { value: "sms",   label: "SMS" },
        { value: "push",  label: "Push Notification" },
    ]}
/>`}</CodeView>

            <CheckboxGroup
                name="notifications-switch"
                label="Notification Channels"
                variant="switch"
                value={switchGroupValues}
                onChange={setSwitchGroupValues}
                options={[
                    { value: "email", label: "Email" },
                    { value: "sms",   label: "SMS" },
                    { value: "push",  label: "Push Notification" },
                ]}
            />
            <p>Selected: <code>{switchGroupValues.length > 0 ? switchGroupValues.join(", ") : "none"}</code></p>

            <br /><br /><br /><br />
        </Container>
    );
};

export default CheckboxPage;
