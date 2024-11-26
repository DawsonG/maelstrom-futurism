import { useState } from 'react';
import Button from '@maelstrom-futurism/button';
import Paper, { PaperVariant } from '@maelstrom-futurism/paper';
import CodeView from '../components/CodeView';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Container } from '@maelstrom-futurism/layout';

function PagePaper() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <h1>Paper {count}</h1>
      <CodeView>
{`<Paper variant={PaperVariant.RANDOM_STACK}>
  <a href="https://vitejs.dev" target="_blank">
    <img src={viteLogo} className="logo" alt="Vite logo" />
  </a>
  <a href="https://react.dev" target="_blank">
    <img src={reactLogo} className="logo react" alt="React logo" />
  </a>
</Paper>`}
      </CodeView>
      <Paper variant={PaperVariant.RANDOM_STACK}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </Paper>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount(count => count + 1)}>Add One</Button>
      </div>
    </Container>
  );
}

export default PagePaper;
