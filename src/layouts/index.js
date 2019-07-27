import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../utils/hooks'

// import 'sanitize.css'
import Nav from '../components/Nav'
import './layout.css'
import Footer from '../components/Footer/Footer'

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata()

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        ></meta>

        {/* icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" />
      </Helmet>
      <Nav>{/* <NavItem to="/frontend">前端</NavItem> */}</Nav>
      <div className="container">{children}</div>
      <Footer></Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
}

export default Layout
