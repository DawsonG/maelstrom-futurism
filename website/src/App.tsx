import { useState } from 'react';
import Button from '@maelstrom-futurism/button';
import Paper, { PaperVariant } from '@maelstrom-futurism/paper';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
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
        <Button>A test button</Button>
      </div>
    </>
  )
}

export default App
