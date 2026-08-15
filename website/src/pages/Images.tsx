import { css } from "@emotion/react";
import { RoundImage, ZoomableImage } from "@maelstrom-futurism/core";
import { Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";

const exampleImages = [
    {
        src: "/example_images/bruce-w-kjtcH8I27v4-unsplash.jpg",
        alt: "Autumn street view of downtown Seattle with the Smith Tower",
        credit: "Bruce W.",
        unsplashUrl: "https://unsplash.com/photos/kjtcH8I27v4",
    },
    {
        src: "/example_images/thom-milkovic-skUTVJi8-jc-unsplash.jpg",
        alt: "Seattle skyline at dusk with the Space Needle and Mount Rainier",
        credit: "Thom Milkovic",
        unsplashUrl: "https://unsplash.com/photos/skUTVJi8-jc",
    },
    {
        src: "/example_images/daniel-gomez-RAtlfFf3Y_8-unsplash.jpg",
        alt: "Starry night sky framed by silhouetted treetops",
        credit: "Daniel Gomez",
        unsplashUrl: "https://unsplash.com/photos/RAtlfFf3Y_8",
    },
];

const ImagesPage = () => (
    <Container>
        <h1>Images</h1>
        <p>
            Found in <code>@maelstrom-futurism/core</code> and <code>maelstrom-futurism</code>.
        </p>

        <h2>Zoomable Images</h2>
        <p>
            Wrap an <code>&lt;img/&gt;</code> in <code>ZoomableImage</code> to let readers click it open
            into a fullscreen, borderless view of the full-resolution image. Click the overlay, its close
            button, or press <code>Escape</code> to dismiss it.
        </p>
        <CodeView>{`<ZoomableImage
    src="/example_images/thom-milkovic-skUTVJi8-jc-unsplash.jpg"
    alt="Seattle skyline at dusk with the Space Needle and Mount Rainier"
/>`}</CodeView>

        <div css={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: var(--mf-space-4);
            margin-bottom: var(--mf-space-4);
        `}
        >
            {exampleImages.map((image) => (
                <figure key={image.src} css={css`margin: 0;`}>
                    <ZoomableImage
                        src={image.src}
                        alt={image.alt}
                        styles={css`width: 100%; height: 160px; object-fit: cover; border-radius: var(--mf-radius-card);`}
                    />
                    <figcaption css={css`margin-top: var(--mf-space-1); font-size: var(--mf-size-sm);`} className="mf-text-muted">
                        Photo by {image.credit} on <a href={image.unsplashUrl} target="_blank" rel="noreferrer">Unsplash</a>
                    </figcaption>
                </figure>
            ))}
        </div>
        <h2>Round Images</h2>
        <p>
            Wrap an <code>&lt;img/&gt;</code> in <code>RoundImage</code> to crop it into a circle or an
            oval. <code>shape="circle"</code> (the default) forces a 1:1 aspect ratio;{" "}
            <code>shape="oval"</code> keeps the given <code>width</code>/<code>height</code> independently,
            so an oval can be wider than it is tall or taller than it is wide. Both use{" "}
            <code>object-fit: cover</code>, so the source image crops rather than stretches.
        </p>
        <CodeView>{`<RoundImage
    src="/example_images/daniel-gomez-RAtlfFf3Y_8-unsplash.jpg"
    alt="Starry night sky framed by silhouetted treetops"
    width="120px"
/>
<RoundImage
    src="/example_images/thom-milkovic-skUTVJi8-jc-unsplash.jpg"
    alt="Seattle skyline at dusk with the Space Needle and Mount Rainier"
    shape="oval"
    width="180px"
    height="110px"
/>
<RoundImage
    src="/example_images/bruce-w-kjtcH8I27v4-unsplash.jpg"
    alt="Autumn street view of downtown Seattle with the Smith Tower"
    shape="oval"
    width="110px"
    height="180px"
/>`}</CodeView>

        <div css={css`
            display: flex;
            align-items: center;
            gap: var(--mf-space-6);
            flex-wrap: wrap;
            margin-bottom: var(--mf-space-4);
        `}
        >
            <figure css={css`margin: 0; text-align: center;`}>
                <RoundImage
                    src="/example_images/daniel-gomez-RAtlfFf3Y_8-unsplash.jpg"
                    alt="Starry night sky framed by silhouetted treetops"
                    width="120px"
                />
                <figcaption css={css`margin-top: var(--mf-space-1); font-size: var(--mf-size-sm);`} className="mf-text-muted">
                    circle
                </figcaption>
            </figure>

            <figure css={css`margin: 0; text-align: center;`}>
                <RoundImage
                    src="/example_images/thom-milkovic-skUTVJi8-jc-unsplash.jpg"
                    alt="Seattle skyline at dusk with the Space Needle and Mount Rainier"
                    shape="oval"
                    width="180px"
                    height="110px"
                />
                <figcaption css={css`margin-top: var(--mf-space-1); font-size: var(--mf-size-sm);`} className="mf-text-muted">
                    oval (wide)
                </figcaption>
            </figure>

            <figure css={css`margin: 0; text-align: center;`}>
                <RoundImage
                    src="/example_images/bruce-w-kjtcH8I27v4-unsplash.jpg"
                    alt="Autumn street view of downtown Seattle with the Smith Tower"
                    shape="oval"
                    width="110px"
                    height="180px"
                />
                <figcaption css={css`margin-top: var(--mf-space-1); font-size: var(--mf-size-sm);`} className="mf-text-muted">
                    oval (tall)
                </figcaption>
            </figure>
        </div>
    </Container>
);

export default ImagesPage;
