import { useState } from "react";
import { css } from "@emotion/react";
import { CountUp } from "@maelstrom-futurism/core";
import { Button } from "@maelstrom-futurism/button";
import { Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";

const statStyle = css`
    display: block;
    font-size: 3rem;
    font-weight: 700;
    color: var(--mf-active);
`;

const CountUpPage = () => {
    const [basicKey, setBasicKey] = useState(0);
    const [formattedKey, setFormattedKey] = useState(0);
    const [countdownKey, setCountdownKey] = useState(0);

    return (
        <Container>
            <h1>CountUp</h1>

            <p>
                Animates a number from a starting value up to its target the first time it scrolls
                into view, using <code>requestAnimationFrame</code> and an eased tween — no re-trigger
                on scrolling away and back. Scroll each demo below out of view and back to see it
                fire, or use the Replay button to re-trigger it without leaving the page.
            </p>

            <p>Found in <code>@maelstrom-futurism/core</code> and <code>maelstrom-futurism</code>.</p>

            <h2>Basic</h2>
            <p>Counts from <code>0</code> (the default <code>start</code>) up to <code>value</code> over <code>duration</code> ms.</p>

            <CodeView>{`<CountUp value={2400} duration={1500} css={statStyle} />`}</CodeView>

            <div>
                <CountUp key={basicKey} value={2400} duration={1500} css={statStyle} />
                <div>
                    <Button type="button" variant="secondary" size="sm" onClick={() => setBasicKey((k) => k + 1)}>
                        Replay
                    </Button>
                </div>
            </div>

            <h2>Custom Formatter</h2>
            <p>
                Pass <code>formatter</code> to control how each frame's value is displayed — useful
                for currency, percentages, or units.
            </p>

            <CodeView>{`<CountUp
    value={48239.5}
    duration={1800}
    formatter={(n) => \`$\${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`}
    css={statStyle}
/>`}</CodeView>

            <div>
                <CountUp
                    key={formattedKey}
                    value={48239.5}
                    duration={1800}
                    formatter={(n) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    css={statStyle}
                />
                <div>
                    <Button type="button" variant="secondary" size="sm" onClick={() => setFormattedKey((k) => k + 1)}>
                        Replay
                    </Button>
                </div>
            </div>

            <h2>Counting Down</h2>
            <p>Pass a <code>start</code> greater than <code>value</code> to count down instead.</p>

            <CodeView>{`<CountUp start={100} value={0} duration={1200} formatter={(n) => \`\${Math.round(n)}%\`} css={statStyle} />`}</CodeView>

            <div>
                <CountUp
                    key={countdownKey}
                    start={100}
                    value={0}
                    duration={1200}
                    formatter={(n) => `${Math.round(n)}%`}
                    css={statStyle}
                />
                <div>
                    <Button type="button" variant="secondary" size="sm" onClick={() => setCountdownKey((k) => k + 1)}>
                        Replay
                    </Button>
                </div>
            </div>

            <h2>Stat Row</h2>
            <p>A common pattern: several counters laid out side by side, each animating independently once visible.</p>

            <CodeView>{`<div style={{ display: "flex", gap: "48px" }}>
    <div>
        <CountUp value={128} duration={1200} css={statStyle} />
        <div>Contributors</div>
    </div>
    <div>
        <CountUp value={9500} duration={1600} css={statStyle} />
        <div>Downloads</div>
    </div>
    <div>
        <CountUp value={42} duration={1000} css={statStyle} />
        <div>Components</div>
    </div>
</div>`}</CodeView>

            <div css={css`display: flex; gap: 48px; flex-wrap: wrap; margin-bottom: 160px;`}>
                <div>
                    <CountUp value={128} duration={1200} css={statStyle} />
                    <div>Contributors</div>
                </div>
                <div>
                    <CountUp value={9500} duration={1600} css={statStyle} />
                    <div>Downloads</div>
                </div>
                <div>
                    <CountUp value={42} duration={1000} css={statStyle} />
                    <div>Components</div>
                </div>
            </div>
        </Container>
    );
};

export default CountUpPage;
