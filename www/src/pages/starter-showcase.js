import React, { Component } from "react"
import { graphql } from "gatsby"

import StarterShowcaseView from "../views/starter-showcase"

class StarterShowcasePage extends Component {
  render() {
    const data = this.props.data
    const location = this.props.location

    return <StarterShowcaseView data={data} location={location} />
  }
}

export default StarterShowcasePage

export const starterShowcaseQuery = graphql`
  query SiteShowcaseQuery {
    allFile(filter: { absolutePath: { regex: "/screenshots/" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 280, maxHeight: 230) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      filter: { fileAbsolutePath: { regex: "/starters/", ne: null } }
    ) {
      edges {
        node {
          id
          fileAbsolutePath
          frontmatter {
            demo
            repo
            tags
            features
          }
          fields {
            anchor
            slug
            title
            package
            starterShowcase {
              stub
              gatsbyDependencies
              lastUpdated
              description
              githubFullName
              owner {
                avatar_url
              }
              githubData {
                repoMetadata {
                  full_name
                  pushed_at
                  name
                  owner {
                    login
                  }
                }
              }
              stars
            }
          }
        }
      }
    }
  }
`
