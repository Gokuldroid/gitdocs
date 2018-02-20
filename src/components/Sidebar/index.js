import React from 'react'
import { withRouteData } from 'react-static'
//
import Toggle from 'elements/Toggle'
import SidebarItem from './SidebarItem'
import Wrapper from './Wrapper'
import Header from './Header'

const Sidebar = ({ tree, config, sidebarIsOpen, onSidebarToggle }) => (
  <Wrapper sidebarIsOpen={sidebarIsOpen} className="sidebar" position={config.sidebar.position}>
    <Toggle
      sidebarIsOpen={sidebarIsOpen}
      position={config.sidebar.position}
      onClick={onSidebarToggle}
    />
    <div className="inner">
      <Header position={config.sidebar.position}>
        <span>
          <a href={config.repository}>{config.name}</a> <span>v. {config.version}</span>
        </span>
      </Header>
      <ul>{tree.map(item => <SidebarItem item={item} key={item.path} config={config} />)}</ul>
    </div>
  </Wrapper>
)

export default withRouteData(Sidebar)
