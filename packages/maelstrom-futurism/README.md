# maelstrom-futurism

> Convenience package that re-exports all major `@maelstrom-futurism/*` components in a single import.

Part of the [Maelstrom Futurism](https://github.com/DawsonG/maelstrom-futurism) UI framework — an opinionated React component library built with [Emotion](https://emotion.sh).

## Installation

```bash
npm i maelstrom-futurism
```

## Usage

Wrap your app with a `ThemeProvider` and start using components:

```tsx
import { ThemeProvider, createTheme, Button, Input } from 'maelstrom-futurism';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={createTheme('nordDark')}>
    <App />
  </ThemeProvider>
);
```

`createTheme` accepts a theme object or the name of a built-in preset. Available presets: `nordDark`, `nordLight`.

## Included Packages

| Package | Description |
|---|---|
| `@maelstrom-futurism/core` | ThemeProvider, createTheme, shared utilities |
| `@maelstrom-futurism/button` | Button, ButtonGroup, DropdownButton |
| `@maelstrom-futurism/form` | Form input components |
| `@maelstrom-futurism/layout` | Layout and grid components |
| `@maelstrom-futurism/modal` | Modal dialogs |
| `@maelstrom-futurism/navbar` | Navigation bar |
| `@maelstrom-futurism/paper` | Paper/card components |
| `@maelstrom-futurism/sidebar` | Sidebar navigation |
| `@maelstrom-futurism/tooltip` | Tooltips |

> Packages prefixed with `mf-` (e.g. `mf-color`, `mf-bot-differentiator`) are **not** included here due to their specialized use cases. Install them separately as needed.

## Selective Imports

If you only need a few components, install individual packages instead to keep your bundle lean:

```bash
npm i @maelstrom-futurism/core @maelstrom-futurism/button
```

## License

MIT
