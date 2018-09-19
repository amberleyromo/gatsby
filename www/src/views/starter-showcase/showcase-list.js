import React from "react"
import FaExtLink from "react-icons/lib/fa/external-link"
import FaGithub from "react-icons/lib/fa/github"
import FaClipboard from "react-icons/lib/fa/clipboard"
import MdStar from "react-icons/lib/md/star"
import { rhythm, options } from "../../utils/typography"
import presets, { colors } from "../../utils/presets"
import copyToClipboard from "../../utils/copy-to-clipboard"
import styles from "../shared/styles"
import ThumbnailLink from "../shared/thumbnail"

const ShowcaseList = ({ urlState, starters, count, sortRecent }) => {
  if (!starters.length) {
    // empty state!
    const emptyStateReason =
      urlState.s !== ``
        ? urlState.s // if theres a search term
        : urlState.d && !Array.isArray(urlState.d)
          ? urlState.d // if theres a single dependency
          : `matching` // if no search term or single dependency
    return (
      <div
        css={{
          display: `grid`,
          height: `80%`,
          alignItems: `center`,
          justifyContent: `center`,
          textAlign: `center`,
        }}
      >
        <h1>
          No {`${emptyStateReason}`} starters found!
          <div css={{ color: colors.gatsby }}>
            <small>
              Maybe you should write one and
              {` `}
              <a href="https://github.com/gatsbyjs/gatsby/issues/new?template=feature_request.md">
                submit it
              </a>
              ?
            </small>
          </div>
        </h1>
      </div>
    )
  }
  if (count)
    starters = starters.sort(sortingFunction(sortRecent)).slice(0, count)
  return (
    <div
      css={{
        fontFamily: options.headerFontFamily.join(`,`),
        ...styles.showcaseList,
      }}
    >
      {starters.map(({ node: starter }) => {
        const {
          description,
          gatsbyDependencies,
          name,
          githubFullName,
          lastUpdated,
          owner,
          stars,
          stub,
        } = starter.fields.starterShowcase
        const { url: demoUrl, repo: repoUrl } = starter
        const gatsbyVersion = gatsbyDependencies.find(
          ([k, v]) => k === `gatsby`
        )[1]
        const match = gatsbyVersion.match(/([0-9]+)([.])([0-9]+)/) // we just want x.x
        const minorVersion = match ? match[0] : gatsbyVersion // default to version if no match
        const isGatsbyVersionWarning = !/(2..+|next|latest)/g.test(minorVersion) // either 2.x or next or latest

        return (
          starter.fields && ( // have to filter out null fields from bad data
            <div
              key={starter.id}
              css={{
                ...styles.showcaseItem,
              }}
              {...styles.withTitleHover}
            >
              <ThumbnailLink
                slug={`/starters/${stub}`}
                image={starter.childScreenshot}
                title={starter.name}
              />
              <div
                css={{
                  ...styles.meta,
                }}
              >
                <div css={{ display: `flex`, justifyContent: `space-between` }}>
                  <span css={{ color: colors.gray.dark }}>{owner} /</span>
                  <span
                    css={{
                      "> a": {
                        paddingLeft: 5,
                        "&:hover": {
                          background: `none`,
                          color: colors.gatsby,
                        },
                      },
                    }}
                  >
                    <a
                      href="#copy-to-clipboard"
                      onClick={() =>
                        copyToClipboard(`https://github.com/${githubFullName}`)
                      }
                      css={{ ...styles.noLinkUnderline }}
                    >
                      <FaClipboard />
                      {` `}
                    </a>
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      css={{ ...styles.noLinkUnderline }}
                    >
                      <FaExtLink />
                      {` `}
                    </a>
                    <a
                      href={`https://github.com/${githubFullName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      css={{ ...styles.noLinkUnderline }}
                    >
                      <FaGithub />
                      {` `}
                    </a>
                  </span>
                </div>
                <div>
                  <span className="title">
                    <h5 css={{ margin: 0 }}>
                      <strong>{name}</strong>
                    </h5>
                  </span>
                  {/* {isGatsbyVersionWarning ?
                      <span css={{ fontStyle: `italic`, color: `red` }}>Outdated Version: {minorVersion}</span> :
                      <span css={{ fontStyle: `italic`, color: `green` }}>Gatsby Version: {minorVersion}</span>
                    } */}
                </div>
                <div
                  css={{
                    textOverflow: `ellipsis`,
                    overflow: `hidden`,
                    whiteSpace: `nowrap`,
                  }}
                >
                  {description || `No description`}
                </div>
                <div css={{ display: `flex`, justifyContent: `space-between` }}>
                  <div css={{ display: `inline-block` }}>
                    <MdStar
                      style={{
                        color: colors.accent,
                        verticalAlign: `text-top`,
                      }}
                    />
                    {stars}
                  </div>
                  <div css={{ display: `inline-block` }}>
                    Updated {new Date(lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          )
        )
      })}
      {/* makes last row items equal width and aligned left */}
      <div
        aria-hidden="true"
        css={{ ...styles.showcaseItem, marginTop: 0, marginBottom: 0 }}
      />
      <div
        aria-hidden="true"
        css={{ ...styles.showcaseItem, marginTop: 0, marginBottom: 0 }}
      />
      <div
        aria-hidden="true"
        css={{ ...styles.showcaseItem, marginTop: 0, marginBottom: 0 }}
      />
      <div
        aria-hidden="true"
        css={{ ...styles.showcaseItem, marginTop: 0, marginBottom: 0 }}
      />
      <div
        aria-hidden="true"
        css={{ ...styles.showcaseItem, marginTop: 0, marginBottom: 0 }}
      />
      <div
        aria-hidden="true"
        css={{ ...styles.showcaseItem, marginTop: 0, marginBottom: 0 }}
      />
    </div>
  )
}

export default ShowcaseList

function sortingFunction(sortRecent) {
  return function({ node: nodeA }, { node: nodeB }) {
    const safewrap = obj =>
      sortRecent ? new Date(obj.lastUpdated) : obj[`stars`]
    const metricA = safewrap(nodeA.fields.starterShowcase)
    const metricB = safewrap(nodeB.fields.starterShowcase)
    return metricB - metricA
  }
}
