import { useRef } from "react";
import { css } from "@emotion/react";
import { Box, ContentBox, CopyButton, Pill } from "@maelstrom-futurism/core";
import { Container } from "@maelstrom-futurism/layout";
import { Button } from "@maelstrom-futurism/button";
import CodeView from "../components/CodeView";

const ContentBoxPage = () => {
    const npmInstallRef = useRef<HTMLElement>(null);

    return (
    <Container>
        <h1>Box and ContentBox</h1>
        <p>
            Boxes are the simplest unit of styling inside Maelstrom-Futurism. They are essentially
            a special &lt;div/&gt; tag with a couple of style helpers.  They can be used by
        </p>

        <p>Found in <code>@maelstrom-futurism/core</code> and <code>maelstrom-futurism</code>.</p>

        <h2>Sticky Box</h2>
        <p>
            Pass <code>sticky</code> to make a <code>Box</code> stick to the top of its scroll
            container once it would otherwise scroll out of view. A <code>data-stuck</code> attribute
            and a shadow are applied while stuck; <code>stickyOffset</code> controls the distance from
            the top. Scroll the panel below to see it in action.
        </p>
        <CodeView>{`<Box sticky stickyOffset="12px" styles={css\`padding: 12px 16px; background: var(--mf-content);\`}>
    I stick to the top while you scroll.
</Box>`}</CodeView>

        <div css={css`
            height: 260px;
            overflow-y: auto;
            border: var(--mf-border-width-thin) solid var(--mf-border);
            border-radius: var(--mf-radius-card);
            background-color: inherit;
        `}
        >
            <Box
                sticky
                stickyOffset="12px"
                styles={css`padding: 12px 16px; background: var(--mf-content); font-weight: 500;`}
            >
                I stick to the top while you scroll.
            </Box>
            {Array.from({ length: 12 }, (_, i) => (
                <p key={i} css={css`padding: 0 16px;`}>
                    Scrollable content line {i + 1}. Keep scrolling to watch the box above pick up a shadow once it's stuck.
                </p>
            ))}
        </div>

        <h2>ContentBox</h2>
        <CodeView>{`<ContentBox variant='alert'>This is an alert or error.</ContentBox>
<ContentBox variant='warning'>This is a warning.</ContentBox>
<ContentBox variant='info'>This is an info.</ContentBox>
<ContentBox variant='success'>This is a success.</ContentBox>
<ContentBox>Normal ContentBox with no variant assigned.</ContentBox>`}</CodeView>

        <ContentBox variant='alert'>This is an alert or error.</ContentBox>
        <ContentBox variant='warning'>This is a warning.</ContentBox>
        <ContentBox variant='info'>This is an info.</ContentBox>
        <ContentBox variant='success'>This is a success.</ContentBox>
        <ContentBox>Normal ContentBox with no variant assigned.</ContentBox>
        <ContentBox styles={css`border: var(--nord-polar-1);color: red;`}>This ContentBox has some custom overrides applied.</ContentBox>

        <h2>Truncated ContentBox</h2>
        <p>
            Pass <code>clampLines</code> to clamp long content to a fixed number of lines, with a
            "Show more" / "Show less" toggle appended automatically — but only when the content
            actually overflows the clamp. Short content that already fits gets no toggle at all.
        </p>
        <CodeView>{`<ContentBox clampLines={3}>
    A long paragraph of text that will be clamped to three lines, with a
    "Show more" toggle appended automatically once it overflows...
</ContentBox>

<ContentBox clampLines={3}>Short content that fits within three lines.</ContentBox>`}</CodeView>

        <ContentBox clampLines={3}>
            Maelstrom Futurism is a component library built around consistent design tokens,
            accessible defaults, and small composable primitives rather than large monolithic
            components. Every piece — buttons, inputs, layout primitives, and more — pulls its
            colors, spacing, radii, and motion timing from a small set of CSS custom properties
            defined by the active theme, so switching themes or adjusting a single token cascades
            consistently across the entire library without touching individual components.
        </ContentBox>

        <ContentBox clampLines={3}>Short content that fits within three lines.</ContentBox>

        <h2>Pills</h2>
        <Pill variant='alert'>Alert | Error</Pill>
        <Pill variant='warning'>Warning</Pill>
        <Pill variant='info'>Info</Pill>
        <Pill variant='success'>Success</Pill>

        <h2>Pills with Overwrite</h2>
        <Pill styles={css`border: none;background: red;color: white;`}>Custom</Pill>

        <h2>Copy to Clipboard</h2>
        <p>
            <code>CopyButton</code> copies text on click and shows a transient "Copied!" bubble on
            success. By default it renders a plain trigger button; pass a <code>trigger</code> render
            prop to use the MF <code>Button</code> (or any other clickable component) instead. Copy
            source is <code>text</code> for an explicit value, or <code>targetId</code>/<code>targetRef</code>{" "}
            to copy another element's text content.
        </p>
        <CodeView>{`<CopyButton
    text="npm install @maelstrom-futurism/core"
    trigger={({ onClick }) => (
        <Button type="button" variant="secondary" onClick={onClick}>
            Copy install command
        </Button>
    )}
/>

<code ref={npmInstallRef}>npm install @maelstrom-futurism/core</code>
<CopyButton
    targetRef={npmInstallRef}
    trigger={({ onClick }) => (
        <Button type="button" variant="secondary" size="sm" onClick={onClick}>Copy</Button>
    )}
/>`}</CodeView>

        <div css={css`display: flex; align-items: center; gap: var(--mf-space-4); flex-wrap: wrap;`}>
            <CopyButton
                text="npm install @maelstrom-futurism/core"
                trigger={({ onClick }) => (
                    <Button type="button" variant="secondary" onClick={onClick}>
                        Copy install command
                    </Button>
                )}
            />

            <span css={css`display: inline-flex; align-items: center; gap: var(--mf-space-2);`}>
                <code ref={npmInstallRef}>npm install @maelstrom-futurism/core</code>
                <CopyButton
                    targetRef={npmInstallRef}
                    trigger={({ onClick }) => (
                        <Button type="button" variant="secondary" size="sm" onClick={onClick}>Copy</Button>
                    )}
                />
            </span>
        </div>

        <br/><br/><br/><br/>
    </Container>
    );
};

export default ContentBoxPage;