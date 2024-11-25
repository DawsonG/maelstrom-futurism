import CodeView from './components/CodeView';
import { Container } from '@maelstrom-futurism/layout';

function App() {
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
    </Container>
  );
}

export default App;
