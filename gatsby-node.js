const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve('./src/templates/BlogPost/BlogPost.js')

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.error(result.errors)
    return false
  }

  // Create blog posts pages
  result.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      path: edge.node.fields.slug,
      component: blogPost,
      context: { slug: edge.node.fields.slug },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    let sourceInstanceName, value
    const parentNode = getNode(node.parent)
    if (parentNode && parentNode.internal.type === `File`) {
      sourceInstanceName = parentNode.sourceInstanceName
      value = '/' + sourceInstanceName + '/' + parentNode.id
    }
    createNodeField({
      name: 'slug',
      node,
      value,
    })
    createNodeField({
      name: 'sourceInstanceName',
      node,
      value: sourceInstanceName,
    })
  }
}
