import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Highlight from 'react-highlight-words'
import { createDB } from './db'
import strip from './strip'
import history from '../history'
import { Wrapper, Input, Results, Result } from './styles'

const UP = 'ArrowUp'
const DOWN = 'ArrowDown'
const ENTER = 'Enter'
const ESCAPE = 'Escape'

function ellipsify (text, limit) {
  if (!text) return ''

  if (text.length <= limit) {
    return text
  }

  return `${text.substring(0, limit)}...`
}

class Search extends Component {
  constructor (props) {
    super(props)

    // Basic state for querying and loading
    this.state = {
      query: '',
      loading: false,
      selectedIndex: 0,
      results: [],
    }

    // Index docs for search results
    this.loadResults()
  }

  async loadResults () {
    // Initialize search instance and set indices
    const resp = await axios.get('/db.json')
    this.db = createDB({
      ref: 'url',
      indices: ['title', 'content'],
      items: resp.data,
    })
  }

  handleChange = e => {
    const { value } = e.target
    this.setState({
      query: value,
      loading: value.length !== 0
    }, async () => {
      const results = await this.fetchResults(value)
      this.setState({ results, loading: false })
    })
  }

  handleKeyUp = e => {
    const { key } = e

    if (e.key === ESCAPE) {
      return this.clearSearch()
    }

    // Only listen for key up, down, and enter
    if (
      !key === UP &&
      !key === DOWN &&
      !key === ENTER
    ) return false

    // Get the selected index if it exists
    const { selectedIndex = 0, results } = this.state

    if (key === ENTER) {
      const selected = results[selectedIndex]
      if (selected) history.push(selected.url)
      this.clearSearch()
    }

    // Next selected index
    let nextIndex = selectedIndex

    if (key === UP) {
      if (selectedIndex === 0) {
        nextIndex = results.length - 1
      } else if (selectedIndex < 0) {
        nextIndex = results.length - 1
      } else {
        nextIndex = selectedIndex - 1
      }
    }

    if (key === DOWN) {
      if (selectedIndex === results.length - 1) {
        nextIndex = 0
      } else {
        nextIndex = selectedIndex + 1
      }
    }

    this.setState({ selectedIndex: nextIndex })
  }

  fetchResults (query) {
    return new Promise((resolve, reject) => {
      const results = this.db
        .search(query)
        .slice(0, 10)
      resolve(results)
    })
  }

  clearSearch = () => {
    this.setState({ loading: false, query: '', results: [] })
  }

  renderResults () {
    const { query, loading, selectedIndex, results } = this.state
    if (!query.length) return null

    // Map over search results and create links
    const items = results.map((r, i) =>
      <Result
        key={r.file}
        selected={i === selectedIndex}
        onClick={this.clearSearch}
      >
        <Link to={r.url}>
          <h4>{r.title}</h4>
          <p>
            <Highlight
              highlightClassName="highlight"
              searchWords={query.length > 2 ? query.split(' ') : []}
              autoEscape
              textToHighlight={strip(ellipsify(r.content, 400))}
            />
          </p>
          <span className="url">{r.url}</span>
        </Link>
      </Result>
    )

    return (
      <Results>
        {items.length !== 0 && !loading && items}
        {items.length === 0 && !loading && <span>No Results...</span>}
        {loading && <span>Loading...</span>}
      </Results>
    )
  }

  render () {
    return (
      <Wrapper>
        <Input
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          value={this.state.query}
          placeholder="Search documentation..."
        />
        {this.renderResults()}
      </Wrapper>
    )
  }
}

export default Search
