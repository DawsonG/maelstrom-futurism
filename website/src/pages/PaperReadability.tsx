import { ReactElement } from "react";
import { Paper } from '@maelstrom-futurism/paper';
import { Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";
import { text } from '../components/Text';

const PagePaperReadability = (): ReactElement => (
    <Container>
      <h1>Paper with Readability Controls</h1>
      <p></p>

      <CodeView>
{`<Paper variant="none" showReadabilityControls={true}>
  {text}
</Paper>`}        
      </CodeView>

      <Paper variant="none" showReadabilityControls={true}>
        {text}
      </Paper>
    </Container>
);

export default PagePaperReadability;