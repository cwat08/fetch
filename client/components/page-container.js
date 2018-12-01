import React, {Component} from 'react'
import SearchBar from './search-bar'
import Html from './html'
import axios from 'axios'
import Loader from './loader'
class PageContainer extends Component {
  constructor() {
    super()
    this.state = {
      activeClass: '',
      html: [],
      searchUrl: '',
      searchInput: '',
      invalidSearch: false,
      protocol: 'https',
      loading: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSurprise = this.handleSurprise.bind(this)
  }

  async handleClick(evt) {
    await this.setState({activeClass: evt.target.getAttribute('name')})
  }

  async handleSurprise() {
    try {
      this.setState({loading: true, invalidSearch: false, html: []})
      const results = await axios.get('/api/surprise')
      this.setState({
        html: results.data.html,
        searchUrl: results.data.url,
        activeClass: '',
        loading: false
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const url = this.state.searchInput
    const protocol = this.state.protocol
    this.setState({invalidSearch: false, loading: true, html: []})
    const results = await axios.get(`/api/fetch/${protocol}/${url}`)
    if (results.data === 'error') {
      this.setState({invalidSearch: true, loading: false})
    } else {
      this.setState({
        html: results.data,
        searchUrl: url,
        searchInput: '',
        activeClass: '',
        loading: false
      })
    }
  }

  handleChange(evt) {
    this.setState({searchInput: evt.target.value})
  }

  async handleSelect(evt) {
    await this.setState({protocol: evt.target.value})
    console.log(this.state.protocol)
  }

  render() {
    return (
      <div id="page-container">
        <div className="search-bar-container">
          <div>
            <SearchBar
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              searchInput={this.state.searchInput}
              handleSelect={this.handleSelect}
              handleSurprise={this.handleSurprise}
            />
          </div>
          {this.state.invalidSearch ? (
            <div className="error-message">Please enter a valid url</div>
          ) : null}
        </div>

        {this.state.loading ? <Loader /> : null}
        {this.state.html.length ? (
          <div id="html-container">
            <div id="page-name">
              SOURCE CODE FOR:{' '}
              <a href={`https://${this.state.searchUrl}`} target="_blank">{`${
                this.state.searchUrl
              }`}</a>
            </div>

            <div id="html-body">
              <Html
                handleClick={this.handleClick}
                html={this.state.html}
                activeClass={this.state.activeClass}
              />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default PageContainer
