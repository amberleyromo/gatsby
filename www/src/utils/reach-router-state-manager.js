import React, { Component, Fragment } from "react"
import queryString from "query-string"
import { navigate } from "@reach/router"

const emptySearchState = { s: ``, c: [], d: [], v: [], sort: `recent` }
class RRSM extends Component {
  state = emptySearchState

  static defaultProps = {
    defaultSearchState: {},
  }

  setUrlState = newState => {
    const finalState = { ...this.state, ...newState }
    // update RSSM state
    this.setState({ ...finalState })

    // sync url to RSSM
    Object.keys(finalState).forEach(function(k) {
      if (
        // Don't save some state values if it meets the conditions below.
        !finalState[k] || // falsy
        finalState[k] === `` || // string
        (Array.isArray(finalState[k]) && !finalState[k].length) || // array
        finalState[k] === emptySearchState[k] // same as default state, unnecessary
      ) {
        delete finalState[k] // Drop query params with new values = falsy
      }
    })
    return navigate(`${location.pathname}?${queryString.stringify(finalState)}`)
  }

  componentDidMount() {
    const urlState = queryString.parse(location.search)

    // if urlState is empty, default to v2
    if (Object.keys(urlState).length === 0) {
      return this.setUrlState(this.props.defaultSearchState)
    }

    // otherwise, set to urlState
    this.setUrlState(urlState)
  }

  render() {
    const { render } = this.props
    return (
      <Fragment>
        {render({
          setURLState: this.setUrlState,
          urlState: this.state,
        })}
      </Fragment>
    )
  }
}

export default RRSM
