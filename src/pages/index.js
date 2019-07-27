import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../utils/hooks'
import unwidow from '../utils/unwidow'
import styles from './index.module.css'
const YearTitle = ({ children }) => (
  <div className={styles.year}>{children}</div>
)
const PostTitle = ({ children }) => <h1>{children}</h1>

const IndexPage = () => {
  const { title } = useSiteMetadata()
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
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
        <title>{title}</title>
      </Helmet>

      <div className={styles.posts}>
        <article>
          <main>
            {posts.length > 0 ? (
              posts.map(({ node }, index) => {
                const { fields, frontmatter, id } = node
                const thisYear = frontmatter.year
                let YearComponent

                if (thisYear !== year) {
                  YearComponent = <YearTitle>{frontmatter.year}</YearTitle>
                  year = thisYear
                }

                return (
                  <div className={styles.post} key={id}>
                    {YearComponent}

                    <div>
                      <PostTitle>
                        <Link to={fields.slug}>
                          {unwidow(frontmatter.title)}
                        </Link>
                      </PostTitle>

                      <p>{unwidow(frontmatter.description)}</p>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className={styles.noPost}>没有找到文章</div>
            )}
          </main>
        </article>
      </div>
    </>
  )
}

export default IndexPage
