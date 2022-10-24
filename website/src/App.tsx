import React from 'react';
import { Container, Column } from '@maelstrom-futurism/layout';

function App() {
  return (
    <Container>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
      <Column>
        Test 1
      </Column>
    </Container>
  );
}

export default App;
