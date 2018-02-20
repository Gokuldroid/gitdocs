import React from 'react'
import styled from 'styled-components'
import { withSiteData, withRouteData } from 'react-static'
import Markdown from 'components/Markdown'
import Doc from 'components/Doc'
import GitHub from 'svg/GitHub'

const Footer = styled.div`
  border-top: 1px solid #ddd;
  padding: 1rem 0;
  margin-top: 1rem !important;

  a {
    display: flex;
    align-items: center;
  }

  svg {
    height: 20px;
    width: 20px;
    margin-right: 0.5rem;
  }
`

const page = ({ doc, config }) => (
  <Doc className="doc">
    <Markdown source={doc.body} config={config} />
    <Footer>
      {config.repository && (
        <a href={`${config.repository}/blob/master${doc.editPath}`}>
          <GitHub /> Edit this page
        </a>
      )}
    </Footer>
  </Doc>
)

export default withSiteData(withRouteData(page))
