import Paper, { PaperVariant, PaperBackground } from '@maelstrom-futurism/paper';
import { Container } from '@maelstrom-futurism/layout';

import CodeView from '../components/CodeView';
import { text } from '../components/Text';

function PagePaper() {

  return (
    <Container>
      <h1>Paper</h1>

      <p>Paper is a legability first component with a few fun tricks (like looking like an actual stack of paper) up its sleeves.</p>
      
      <p>Found in <code>@maelstrom-futurism/paper</code> and <code>maelstrom-futurism</code>.</p>

      <CodeView>
{`<Paper variant={PaperVariant.NONE} background={Background.DOT}>
  {text}
</Paper>`}
      </CodeView>
      <Paper variant={PaperVariant.NONE} background={PaperBackground.DOT}>
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
