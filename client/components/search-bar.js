import React, {Component} from 'react'

class Search extends Component {
  constructor() {
    super()
    // this.state = {
    //   searchUrl: ''
    // }
  }
  // handleChange(evt) {
  //   this.setState({searchUrl: evt.target.value})
  // }
  render() {
    return (
      <div>
        <form id="search-bar">
          <div id="https">https:// </div>
          <input
            name="search"
            value={this.props.searchUrl}
            onChange={this.props.handleChange}
          />
          <button type="submit" onClick={this.props.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default Search