import React from 'react';
import Paper, { PaperVariant } from '@maelstrom-futurism/paper';
import { Container, Column, Grid } from '@maelstrom-futurism/layout';

const Filler: React.FC = () => <div>
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
</div>;

function App() {
  return (
    <Container>
      <Paper variant={PaperVariant.RANDOM_STACK}>
        Random stack
      </Paper>

      <Paper variant={PaperVariant.STACK}>
        <Filler/>
      </Paper>

      <Paper variant={PaperVariant.SINGLE}>
        <Filler/>
      </Paper>

      <Grid>
        <Column><Filler/></Column>
        <Column><Filler/></Column>
        <Column><Filler/></Column>
      </Grid>

      <Grid>
        <Column sm={12} md={3} lg={1}>
          <div className="box">
            SM 12, MD 3, LG 1
          </div>
        </Column>
        <Column sm={2} md={3} lg={4}>
          <div className="box">
            SM 2, MD 3, LG 4
          </div>
        </Column>
        <Column sm={5} md={3} lg={4}>
          <div className="box">
            SM 5, MD 3, LG 4
            </div>
        </Column>
        <Column sm={5} md={3} lg={3}>
          <div className="box">
            SM 5, MD 3, LG 3
          </div>
        </Column>
      </Grid>
    </Container>
  );
}

export default App;
