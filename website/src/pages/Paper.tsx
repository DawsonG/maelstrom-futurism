import { useState } from 'react';
import { Box } from '@maelstrom-futurism/core';
import Button from '@maelstrom-futurism/button';
import Paper, { PaperVariant } from '@maelstrom-futurism/paper';
import { Container } from '@maelstrom-futurism/layout';

import CodeView from '../components/CodeView';

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
        <Box w='100%' h='100px' />
      </Paper>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount(count => count + 1)}>Add One</Button>
      </div>
    </Container>
  );
}

export default PagePaper;
