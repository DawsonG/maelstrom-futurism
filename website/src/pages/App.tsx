import { Paper } from "@maelstrom-futurism/paper";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

function App() {
    const [md, setMd] = useState('');

    useEffect(() => {
        async function loadReadme() {
            // @ts-ignore
            import('../../../Readme.md').then(async (res) => {
                const response = await fetch(res.default);
                const text = await response.text();

                setMd(text);
            });
        }

        loadReadme();
    });

    return <Paper><Markdown>{md}</Markdown></Paper>;
}

export default App;