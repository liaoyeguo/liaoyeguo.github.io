import React from 'react'
import Helmet from 'react-helmet'

const errorPage = () => (
  <>
    <Helmet>
      <title>I goofed it.</title>
    </Helmet>

    <div>404——没有找到这个页面</div>
  </>
)

export default errorPage
