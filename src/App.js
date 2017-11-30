import React, { Component } from 'react'
import { Router, getSiteProps } from 'react-static'
import Routes from 'react-static-routes'
import NProgress from 'nprogress'
import Prism from 'prismjs'
import Sidebar from 'components/Sidebar'
import Toggle from 'elements/Toggle'
import 'styles/global'
import Wrapper from './Wrapper'

class App extends Component {
  state = {
    sidebarIsOpen: window ? window.innerWidth > 700 : true,
    width: window && window.innerWidth,
  }

  componentWillMount () {
    const { languages } = this.props.config

    languages.forEach(lang => {
      if (!Prism.languages[lang]) {
        require(`prismjs/components/prism-${lang}.js`)
      }
    })
  }

  componentDidMount () {
    Router.subscribe(loading => {
      if (loading) {
        NProgress.start()
      } else {
        NProgress.done()
        window.scrollTo(0, 0)
      }
    })

    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions = e => {
    // TODO: Debounce this
    this.setState({
      width: e.target.innerWidth,
      sidebarIsOpen: e.target.innerWidth > 700,
    })
  }

  handleSidebarToggle = () => {
    this.setState({
      sidebarIsOpen: !this.state.sidebarIsOpen,
    })
  }

  render () {
    const { tree, toc, config } = this.props

    return (
      <Router>
        <Wrapper>
          <Sidebar
            tree={tree}
            toc={toc}
            config={config}
            sidebarIsOpen={this.state.sidebarIsOpen}
          />
          <Toggle
            onClick={this.handleSidebarToggle}
            sidebarIsOpen={this.state.sidebarIsOpen}
          />
          <Routes />
        </Wrapper>
      </Router>
    )
  }
}

export default getSiteProps(App)
