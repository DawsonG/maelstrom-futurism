import CodeView from '../components/CodeView';
import { Container } from '@maelstrom-futurism/layout';
import { useThemeToggle } from '@maelstrom-futurism/core';
import { Button } from '@maelstrom-futurism/button';

const ThemeToggleDemo = () => {
  const { colorScheme, toggle } = useThemeToggle();

  return (
    <div>
      <p>Current scheme: <code>{colorScheme}</code></p>
      <Button type="button" variant="primary" onClick={toggle}>
        Switch to {colorScheme === 'dark' ? 'light' : 'dark'} mode
      </Button>
    </div>
  );
};

function Theming() {
  return (
    <Container>
      <h1>Core</h1>
      <h2>@maelstrom-futurism/core</h2>
      <CodeView>
{`import { ThemeProvider, createTheme } from '@maelstrom-futurism/core';

const theme = createTheme('nordDarkColors');
...
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>`}
      </CodeView>

      <h2>Theme Toggle Hook</h2>
      <p>
        <code>useThemeToggle()</code> returns the active <code>colorScheme</code> ('light' or
        'dark') and a <code>toggle()</code> function that flips it. The choice is persisted to{' '}
        <code>localStorage</code> and read back on mount, overriding{' '}
        <code>prefers-color-scheme</code> — so a visitor's manual choice survives a page reload.
        Requires a <code>darkTheme</code> to be passed to the enclosing <code>ThemeProvider</code>{' '}
        (this site's own <code>ThemeProvider</code> already does — click below to try it against
        the whole page, not just this demo).
      </p>

      <CodeView>
{`import { useThemeToggle } from '@maelstrom-futurism/core';

function ThemeToggleButton() {
  const { colorScheme, toggle } = useThemeToggle();

  return (
    <button onClick={toggle}>
      Switch to {colorScheme === 'dark' ? 'light' : 'dark'} mode
    </button>
  );
}`}
      </CodeView>

      <ThemeToggleDemo />
    </Container>
  );
}

export default Theming;
