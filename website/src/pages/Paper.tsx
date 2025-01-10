import Paper, { PaperVariant } from '@maelstrom-futurism/paper';
import { Container } from '@maelstrom-futurism/layout';

import CodeView from '../components/CodeView';
import { text } from '../components/Text';

function PagePaper() {

  return (
    <Container>
      <h1>Paper</h1>

      <p>Paper is a legability first component with a few fun tricks (like looking like an actual stack of paper) up its sleeves.</p>
      
      <CodeView>
{`<Paper variant={PaperVariant.NONE}>
  {text}
</Paper>`}
      </CodeView>
      <Paper variant={PaperVariant.NONE}>
        {text}
      </Paper>

      <CodeView>
{`<Paper variant={PaperVariant.SINGLE}>
  {text}
</Paper>`}
      </CodeView>
      <Paper variant={PaperVariant.SINGLE}>
        {text}
      </Paper>

      <CodeView>
{`<Paper variant={PaperVariant.STACK}>
  {text}
</Paper>`}
      </CodeView>
      <Paper variant={PaperVariant.STACK}>
        {text}
      </Paper>

      <CodeView>
{`<Paper variant={PaperVariant.RANDOM_STACK}>
  {text}
</Paper>`}
      </CodeView>
      <Paper variant={PaperVariant.RANDOM_STACK}>
        {text}
      </Paper>
    </Container>
  );
}

export default PagePaper;
