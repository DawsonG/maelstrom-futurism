import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/prism/night-owl';

SyntaxHighlighter.registerLanguage('jsx', jsx);

const CodeView = ({ children }: { children: string | string[]}): JSX.Element => (
    <SyntaxHighlighter language="jsx" style={nightOwl}>
        {children}
    </SyntaxHighlighter>
);

export default CodeView;