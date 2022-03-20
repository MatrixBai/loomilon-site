/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
     query SiteTitleQuery {
       site {
         siteMetadata {
           title
         }
       }
     }
   `)

  return (
    <>
      <div id="container"
        style={{
          display: `flex`,
          minHeight:`800px`
        }}>
        <div id="sidebar"
          style={{
            float: 'left',
            width: `17%`,
            minHeight:`800px`,
            backgroundColor: `#3c3c3c`
          }}>
          <Header siteTitle={data.site.siteMetadata.title} />
        </div>
        <div id="content"
          style={{
            float: 'right',
            width: `83%`,
            minHeight:`800px`,
            backgroundColor: `#3c3c3c`
          }}
        >
          <main>{children}</main>
        </div>

      </div>

      <footer style={{backgroundColor:`#3c3c3c`, color:`white`, margin:`0 auto`}}>
        © {new Date().getFullYear()}, Craft by Mr. Jing
      </footer>
    </>
  )
}

export default Layout
