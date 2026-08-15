import { css } from "@emotion/react";
import { Card } from "@maelstrom-futurism/core";
import { Button } from "@maelstrom-futurism/button";
import { Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";

const CardPage = () => (
    <Container>
        <h1>Card</h1>

        <p>
            A rounded, bordered surface for grouping content. Pass <code>href</code> to make the
            card clickable — it renders as an anchor with hover and press feedback driven purely by
            background/border color changes, not a 3D lift-and-fall transform. Optional{" "}
            <code>image</code> and <code>actions</code> slots add a top image (clipped to the card's
            rounded corners) and a bottom action row.
        </p>

        <p>Found in <code>@maelstrom-futurism/core</code> and <code>maelstrom-futurism</code>.</p>

        <h2>Static Card</h2>
        <p>Without an <code>href</code>, <code>Card</code> renders a plain, non-interactive <code>&lt;div/&gt;</code>. Children are padded automatically.</p>

        <CodeView>{`<Card>
    <h3>Static Card</h3>
    <p>This card is not clickable — just a grouped surface.</p>
</Card>`}</CodeView>

        <Card>
            <h3 css={css`margin-top: 0;`}>Static Card</h3>
            <p css={css`margin-bottom: 0;`}>This card is not clickable — just a grouped surface.</p>
        </Card>

        <h2>Clickable Card</h2>
        <p>
            Pass <code>href</code> to render an anchor. Hover it to see the background and border
            shift, then click and hold to see the press state — no movement, scaling, or shadow lift.
        </p>

        <CodeView>{`<Card href="#clickable-card-demo">
    <h3>Clickable Card</h3>
    <p>Hover and click to see the feedback states.</p>
</Card>`}</CodeView>

        <Card href="#clickable-card-demo">
            <h3 css={css`margin-top: 0;`}>Clickable Card</h3>
            <p css={css`margin-bottom: 0;`}>Hover and click to see the feedback states.</p>
        </Card>

        <h2>Card with Image</h2>
        <p>
            Pass <code>image</code> to render content flush across the top of the card. It's clipped
            to the card's rounded corners via <code>overflow: hidden</code> on the card itself.
        </p>

        <CodeView>{`<Card
    image={<img src="/example_images/thom-milkovic-skUTVJi8-jc-unsplash.jpg" alt="Seattle skyline at dusk" />}
>
    <h3>Seattle at Dusk</h3>
    <p>Photo by Thom Milkovic on Unsplash.</p>
</Card>`}</CodeView>

        <Card
            image={(
                <img
                    src="/example_images/thom-milkovic-skUTVJi8-jc-unsplash.jpg"
                    alt="Seattle skyline at dusk with the Space Needle and Mount Rainier"
                    css={css`height: 180px;`}
                />
            )}
        >
            <h3 css={css`margin-top: 0;`}>Seattle at Dusk</h3>
            <p css={css`margin-bottom: 0;`}>Photo by Thom Milkovic on Unsplash.</p>
        </Card>

        <h2>Card with Actions</h2>
        <p>
            Pass <code>actions</code> to render a button row at the bottom of the card, separated
            from the body by a divider.
        </p>

        <CodeView>{`<Card
    actions={(
        <>
            <Button variant="primary" size="sm">Add to Cart</Button>
            <Button variant="ghost" size="sm">Details</Button>
        </>
    )}
>
    <h3>Widget</h3>
    <p>A small, reliable widget for all your widget needs.</p>
</Card>`}</CodeView>

        <Card
            actions={(
                <>
                    <Button variant="primary" size="sm">Add to Cart</Button>
                    <Button variant="ghost" size="sm">Details</Button>
                </>
            )}
        >
            <h3 css={css`margin-top: 0;`}>Widget</h3>
            <p css={css`margin-bottom: 0;`}>A small, reliable widget for all your widget needs.</p>
        </Card>

        <h2>Card with Image and Actions</h2>
        <p>All three pieces — <code>image</code>, body children, and <code>actions</code> — can be combined.</p>

        <CodeView>{`<Card
    image={<img src="/example_images/daniel-gomez-RAtlfFf3Y_8-unsplash.jpg" alt="Starry night sky" />}
    actions={(
        <>
            <Button variant="primary" size="sm">Book Now</Button>
            <Button variant="ghost" size="sm">Learn More</Button>
        </>
    )}
>
    <h3>Stargazing Tour</h3>
    <p>An evening under the stars, far from city lights.</p>
</Card>`}</CodeView>

        <Card
            image={(
                <img
                    src="/example_images/daniel-gomez-RAtlfFf3Y_8-unsplash.jpg"
                    alt="Starry night sky framed by silhouetted treetops"
                    css={css`height: 180px;`}
                />
            )}
            actions={(
                <>
                    <Button variant="primary" size="sm">Book Now</Button>
                    <Button variant="ghost" size="sm">Learn More</Button>
                </>
            )}
        >
            <h3 css={css`margin-top: 0;`}>Stargazing Tour</h3>
            <p css={css`margin-bottom: 0;`}>An evening under the stars, far from city lights.</p>
        </Card>

        <h2>Card Grid</h2>
        <p>Cards commonly appear in a responsive grid.</p>

        <CodeView>{`<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
    <Card href="#">
        <h3>Feature One</h3>
        <p>A short description of the first feature.</p>
    </Card>
    <Card href="#">
        <h3>Feature Two</h3>
        <p>A short description of the second feature.</p>
    </Card>
    <Card href="#">
        <h3>Feature Three</h3>
        <p>A short description of the third feature.</p>
    </Card>
</div>`}</CodeView>

        <div css={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 160px;
        `}
        >
            <Card href="#feature-one">
                <h3 css={css`margin-top: 0;`}>Feature One</h3>
                <p css={css`margin-bottom: 0;`}>A short description of the first feature.</p>
            </Card>
            <Card href="#feature-two">
                <h3 css={css`margin-top: 0;`}>Feature Two</h3>
                <p css={css`margin-bottom: 0;`}>A short description of the second feature.</p>
            </Card>
            <Card href="#feature-three">
                <h3 css={css`margin-top: 0;`}>Feature Three</h3>
                <p css={css`margin-bottom: 0;`}>A short description of the third feature.</p>
            </Card>
        </div>
    </Container>
);

export default CardPage;
