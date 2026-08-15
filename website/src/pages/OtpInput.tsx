import { useState } from "react";
import { css } from "@emotion/css";
import { OtpInput } from "@maelstrom-futurism/form";
import { Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";
import { Button } from "@maelstrom-futurism/button";

const controlledRowStyle = css({ display: "flex", alignItems: "center", gap: "16px" });
const spacerStyle = css({ marginBottom: "160px" });

const OtpInputPage = () => {
    const [basicValue, setBasicValue] = useState("");
    const [completedValue, setCompletedValue] = useState<string | null>(null);
    const [controlledValue, setControlledValue] = useState("12");

    return (
        <Container>
            <h1>OtpInput</h1>

            <p>
                Renders <code>length</code> single-character cells for entering a one-time
                passcode. Typing a digit auto-focuses the next cell; Backspace on an empty cell
                clears and refocuses the previous one; pasting a full code splits it across every
                cell starting from the focused one. A hidden input submits the concatenated value
                under <code>name</code>.
            </p>

            <p>Found in <code>@maelstrom-futurism/form</code> and <code>maelstrom-futurism</code>.</p>

            <h2>Basic</h2>
            <p>Try typing digits, pressing Backspace, and pasting a 6-digit code (e.g. <code>123456</code>) into any cell.</p>

            <CodeView>{`const [value, setValue] = useState("");

<OtpInput name="otp" onChange={setValue} />
<p>Current value: {value || "(empty)"}</p>`}</CodeView>

            <OtpInput name="otp" onChange={setBasicValue} />
            <p>Current value: <code>{basicValue || "(empty)"}</code></p>

            <h2>onComplete</h2>
            <p>Pass <code>onComplete</code> to be notified only once every cell has been filled.</p>

            <CodeView>{`<OtpInput
    name="otp-complete"
    length={4}
    onComplete={(value) => alert(\`Code complete: \${value}\`)}
/>`}</CodeView>

            <OtpInput
                name="otp-complete"
                length={4}
                onComplete={(value) => setCompletedValue(value)}
            />
            {completedValue && <p>Completed with: <code>{completedValue}</code></p>}

            <h2>Controlled</h2>
            <p>Pass <code>value</code>/<code>onChange</code> to control the code externally — useful for pre-filling from a resend flow.</p>

            <CodeView>{`const [value, setValue] = useState("12");

<OtpInput name="otp-controlled" length={4} value={value} onChange={setValue} />
<button type="button" onClick={() => setValue("")}>Clear</button>`}</CodeView>

            <div className={controlledRowStyle}>
                <OtpInput name="otp-controlled" length={4} value={controlledValue} onChange={setControlledValue} />
                <Button onClick={() => setControlledValue("")}>Clear</Button>
            </div>

            <h2>Disabled</h2>

            <CodeView>{`<OtpInput name="otp-disabled" length={4} defaultValue="42" disabled />`}</CodeView>

            <OtpInput name="otp-disabled" length={4} defaultValue="42" disabled />

            <div className={spacerStyle} />
        </Container>
    );
};

export default OtpInputPage;
