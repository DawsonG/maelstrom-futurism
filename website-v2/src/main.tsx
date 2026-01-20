import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme } from "@maelstrom-futurism/core-v2";

const theme = new Theme();

const App = () => (<div><h1>Test</h1></div>);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);