import styled, { css } from 'react-emotion'
import { Link } from 'react-router-dom'
import { Accordion } from '@timberio/ui'

const _iconBase = css`
  width: 30px;
  height: 30px;
  fill: rgba(0, 0, 0, .5);
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 250px;
  margin-left: auto;
  text-align: left;
  @media (max-width: 850px) {
    max-width: 100%;
    height: 70px;
  }
  svg {
    ${_iconBase};
  }
`

export const TopWrapper = styled('div')`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  padding: 0 20px;
  @media (max-width: 850px) {
    justify-content: space-between;
  }
`

export const MenuWrapper = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (max-width: 850px) {
    background: #F5F7F9;
    box-shadow: -2px 0 3px rgba(0, 0, 0, .2);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    width: 100%;
    max-width: 300px;
    overflow: auto;
    opacity: ${props => props.open ? 1 : 0};
    transform: translateX(${props => props.open ? '0%' : '100%'});
    transition: transform .2s, opacity .2s;
  }
`

export const Close = styled('div')`
  flex-shrink: 0;
  display: none;
  align-items: center;
  justify-content: flex-end;
  height: 70px;
  padding: 0 20px;
  @media (max-width: 850px) {
    display: flex;
  }
`

export const Logo = styled(Link)`
  color: #6457DF;
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
  :hover {
    opacity: 0.5;
  }
`

export const Hamburger = styled('div')`
  display: none;
  @media (max-width: 850px) {
    display: block;
  }
`

export const Nav = styled('nav')`
  flex: 1 0 auto;
  border-top: 1px solid #E6E9EB;
  border-bottom: 1px solid #E6E9EB;
  padding: 30px 0 30px 15px;
`

export const NavList = styled(Accordion)`
  padding-left: ${props => props.isFirst ? 0 : '20px'};
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.isFirst ? '#0d2b3e' : '#4c555a'};
    font-size: ${props => props.isFirst ? '1rem' : '.9rem'};
    font-weight: ${props => props.isFirst ? 600 : 400};
    text-decoration: none;
    cursor: pointer;
    line-height: 24px;
    border-left: 3px solid transparent;
    padding: .1rem 1rem .1rem 0;
    // transition: ${props => props.isFirst ? 'none' : 'all 0.2s ease-in-out'};
    &:hover {
      opacity: 0.7;
      ${props => !props.isFirst && css`
        // padding-left: 8px;
      `}
    }
    &.active {
      font-weight: 600;
      ${props => props.isFirst && css`
        color: #6457DF;
        border-right: 3px solid #6457DF;
      `}
      :hover {
        opacity: 1;
      }
    }
    svg {
      fill: rgba(0, 0, 0, .5);
      width: 15px;
      height: 15px;
      margin-right: 15px;
    }
  }
`

export const Callout = styled('a')`
  flex-shrink: 0;
  color: rgba(0, 0, 0, .2);
  font-size: .8rem;
  font-weight: 900;
  padding: 20px 0;
  text-decoration: none;
  text-align: center;
  :hover {
    color: rgba(0, 0, 0, .3);
  }
`
