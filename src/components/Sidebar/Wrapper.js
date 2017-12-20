import styled, { css } from 'styled-components'

export default styled.aside`
  flex: 1 0 auto;
  transition: all .1s ease-in-out;
  min-width: ${props => (props.sidebarIsOpen ? '230px' : '0')};
  max-width: ${props => (props.sidebarIsOpen ? '280px' : '0')};
  background: #f4f7fa;
  overflow-y: auto;
  margin: 0;
  z-index: 99;

  ${props => {
    if (props.position === 'left') {
      return css`border-right: 1px solid #DFE3E8;`
    }
    return css`border-left: 1px solid #DFE3E8;`
  }}

  @media(max-width: 700px) {
    width: 0;
  }

  ${props => props.sidebarIsOpen && css`
    @media(max-width: 700px) {
      position: fixed;
      ${props => (props.position === 'left' ? css`left: 0;` : css`right: 0;`)}
      top: 0;
      bottom: 0;
    }
  `}

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
  }

  > ul {
    padding: 1rem 1.5rem 1.5rem 1.5rem;
  }

  ul ul {
    padding-left: 15px;
  }

  ul ul ul {
    border-left: 3px solid #e4e4e4;
  }

  ul li {
    margin-bottom: .75rem;
  }

  li > ul {
    margin-top: .5rem;
    margin-bottom: 0;
  }

  li > a {
    text-decoration: none;
    color: #404e5c;
    font-size: 1rem;
    line-height: 1.5;
    display: block;

    &.active {
      color: #4688F1;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  h1, h2, h3 {
    text-transform: uppercase;
    letter-spacing: .05em;
    color: #919eab;
    font-weight: 700;
    font-size: .75rem;

    a { text-decoration: none }
  }
`
