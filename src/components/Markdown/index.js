import React, { createElement } from 'react'
import marksy from 'marksy/components'
import Prism from 'prismjs'
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
const PreRenderer = ({ code, language, children }) => {
  // <pre>
  if (!language && !children) {
    return <pre className={`language-${language}`}>{code}</pre>
  }

  // <code>
  if (children && !code && !language) {
    return <code className={`language-${language}`}>{children}</code>
  }

  return (
    <pre className={`language-${language}`}>
      <code
        dangerouslySetInnerHTML={{
          __html: highlight(code, language),
        }}
      />
    </pre>
  )
}
/* eslint-enable react/no-danger */

const compile = marksy({
  createElement,
  elements: {
    i: IconRenderer,
    a: LinkRenderer,
    h1: H1Renderer,
    h2: H2Renderer,
    h3: H3Renderer,
    pre: PreRenderer,
    code: PreRenderer,
  },
  components: {
    Tip: TipRenderer,
    Info: InfoRenderer,
    Warning: WarningRenderer,
    Danger: DangerRenderer,
  },
})

const Markdown = ({ source }) => {
  const content = compile(source)
  const toc = <Contents toc={content.toc} key="markdown-toc" />
  content.tree.unshift(toc)

  return (
    <Wrapper className="markdown">
      {content.tree}
    </Wrapper>
  )
}

export default Markdown
