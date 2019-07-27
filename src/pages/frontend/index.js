import React from 'react'
import PropTypes from 'prop-types'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../../utils/hooks'
import unwidow from '../../utils/unwidow'
import styles from './frontend.module.css'
const YearTitle = ({ children }) => (
  <div className={styles.year}>{children}</div>
)
const PostTitle = ({ children }) => <h1>{children}</h1>

PostTitle.propTypes = {
  children: PropTypes.node.isRequired,
}

const BlogPage = () => {
  const { title } = useSiteMetadata()
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              title
              description
              year: date(formatString: "YYYY")
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.edges
  let year = '0'

  return (
    <>
      <Helmet>
        <title>Blog • {title}</title>
      </Helmet>

      <div className={styles.posts}>
        <article>
          <main>
            {posts.map(({ node }, index) => {
              const { fields, frontmatter } = node
              const thisYear = frontmatter.year
              let YearComponent

              if (thisYear !== year) {
                YearComponent = <YearTitle>{frontmatter.year}</YearTitle>
                year = thisYear
              }

              return (
                <div className={styles.post}>
                  {YearComponent}

                  <div width={[1, 4 / 5]}>
                    <PostTitle>
                      <Link to={fields.slug}>{unwidow(frontmatter.title)}</Link>
                    </PostTitle>

                    <p fontSize={[1, 2]} lineHeight="copy" mt={3} mb={2}>
                      {unwidow(frontmatter.description)}
                    </p>
                  </div>
                </div>
              )
            })}
          </main>
        </article>
      </div>
    </>
  )
}

export default BlogPage
