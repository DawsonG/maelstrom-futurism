import { css } from "@emotion/react";
import { Box, ContentBox, Pill } from "@maelstrom-futurism/core";
import { Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";

const ContentBoxPage = () => (
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

        <h2>Pills</h2>
        <Pill variant='alert'>Alert | Error</Pill>
        <Pill variant='warning'>Warning</Pill>
        <Pill variant='info'>Info</Pill>
        <Pill variant='success'>Success</Pill>

        <h2>Pills with Overwrite</h2>
        <Pill styles={css`border: none;background: red;color: white;`}>Custom</Pill>
    </Container>
);

export default ContentBoxPage;