import styled from 'styled-components'

export default styled.div`
  color: rgba(0,0,0,.7);
  line-height: 1.5;

  h1, h2, h3 {
    position: relative;

    a {
      text-decoration: none;
      display: block;
    }

    svg {
      position: absolute;
      display: none;
      left: -25px;
      top: 50%;
      transform: translateY(-50%);
      height: 16px;
      width: 16px;
    }

    &:hover svg {
      display: inherit;
    }
  }

  ul {
    list-style: disc;
    padding-left: 2rem;
  }

  img {
    max-width: 100%;
  }

  blockquote {
    border-left: 3px solid #315FA8;
    padding-left: 1rem;
    font-style: italic;
  }

  pre {
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
  }

  pre.hljs {
    white-space: inherit;
  }

  pre.line-numbers {
    
  }

  code {
    border-radius: 4px;
    padding: .05rem .25rem;
    display: inline-block;
    border: none !important;
  }

  pre {
    border-radius: 4px;
    font-family: Roboto Mono, monospace;
    border-radius: 3px;
    line-height: 19px;
    font-size: 1em;
    padding: .5rem;
  }

  table {
    display: block;
    width: 100%;
    overflow: auto;
  }

  table th {
    font-weight: bold;
  }

  table th,
  table td {
    padding: 6px 13px;
    border: 1px solid #ddd;
  }

  table tr {
    background-color: #fff;
    border-top: 1px solid #ccc;
  }

  table tr:nth-child(2n) {
    background-color: #f8f8f8;
  }

  svg {
    height: 18px;
    width: 18px;
    margin-right: .5rem;
    margin-bottom: 2px;
  }

  hr {
    border-bottom-color: #eee;
    height: .25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e7e7e7;
    border: 0;
  }
`
