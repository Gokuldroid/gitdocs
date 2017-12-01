import React, { PureComponent, createElement } from 'react'
import marksy from 'marksy/components'
import Prism from 'prismjs'
import SyntaxHighlighter from 'react-syntax-highlighter'
import PrismHighlighter from 'react-syntax-highlighter/prism'
import { atomOneLight } from 'react-syntax-highlighter/styles/hljs'
import escapeHTML from 'escape-html'
import Wrapper from './Wrapper'
import IconRenderer from './Icon'
import LinkRenderer from './Link'
import H1Renderer from './H1'
import H2Renderer from './H2'
import H3Renderer from './H3'
import TipRenderer from './Tip'
import InfoRenderer from './Info'
import WarningRenderer from './Warning'
import DangerRenderer from './Danger'
import Contents from './Contents'

const highlight = (code, language) => {
  try {
    return Prism.highlight(code, Prism.languages[language], language)
  } catch (e) {
    console.warn(`Ensure your language ${language} is defined in docs.json`)
    return escapeHTML(code)
  }
}

/* eslint-disable react/no-danger */
// const PreRenderer = ({ code, language, children }) => {
//   console.log(language)
//   // <pre>
//   if (!language && !children) {
//     return <pre className={`language-${language} line-numbers`}>{code}</pre>
//   }
//
//   // <code>
//   if (children && !code && !language) {
//     return <code className={`language-${language}`}>{children}</code>
//   }
//
//   return (
//     <pre className={`language-${language} line-numbers`}>
//       <code
//         dangerouslySetInnerHTML={{
//           __html: highlight(code, language),
//         }}
//       />
//     </pre>
//   )
// }
/* eslint-enable react/no-danger */

const CodeRenderer = ({ code, language, children, ...rest }) => {
  console.log(language, rest)
  if (!language && !children) {
    return <pre>{code}</pre>
  }

  // <code>
  if (children && !code && !language) {
    return <code>{children}</code>
  }

  const shouldShowLineNumbers = language.includes('no-line-numbers')
    ? false
    : language.includes('line-numbers')
      ? true
      : showLineNumbers

  const props = {
    language,
    useInlineStyles: false,
    showLineNumbers: shouldShowLineNumbers,
    lineNumberStyle: { opacity: 0.3 },
    children: code,
    className: `syntax-${language}`
  }

  // Highlight.js doesn't support jsx yet :/
  if (language === 'jsx') {
    return <PrismHighlighter {...props} />
  }

  return (
    <SyntaxHighlighter {...props} />
  )
}

const compile = marksy({
  createElement,
  elements: {
    i: IconRenderer,
    a: LinkRenderer,
    h1: H1Renderer,
    h2: H2Renderer,
    h3: H3Renderer,
    code: CodeRenderer,
  },
  components: {
    Tip: TipRenderer,
    Info: InfoRenderer,
    Warning: WarningRenderer,
    Danger: DangerRenderer,
  },
})

class Markdown extends React.Component {
  render () {
    const { source, config } = this.props
    const content = compile(source, null, {
      showLineNumbers: config.showLineNumbers,
    })
    const toc = <Contents toc={content.toc} key="markdown-toc" />
    content.tree.unshift(toc)

    return (
      <Wrapper className="markdown">
        {content.tree}
      </Wrapper>
    )
  }
}

export default Markdown
