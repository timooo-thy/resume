import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props {
  value: {
    code: string;
    language: string;
  };
}

const CodeBlock = ({ value }: Props) => {
  const { code, language } = value;
  return (
    <SyntaxHighlighter
      language={language}
      style={atomOneDark}
      customStyle={{
        padding: "1.2em",
        borderRadius: "1em",
      }}
      wrapLongLines={true}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
