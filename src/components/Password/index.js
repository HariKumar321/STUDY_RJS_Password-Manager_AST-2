import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class Password extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isPasswordShown: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onAddWebsite = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const newObj = {id: uuidv4(), website, username, password}

    if (website !== '' && username !== '' && password !== '') {
      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newObj],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {passwordList} = this.state
    const filteredData = passwordList.filter(eachObj => eachObj.id !== id)

    this.setState({passwordList: filteredData})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({isPasswordShown: !prevState.isPasswordShown}))
  }

  renderNoPasswordImage = () => {
    return (
      <div className="no-password-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-password-img"
        />
        <p className="no-password-text"> No Passwords </p>
      </div>
    )
  }

  render() {
    const {
      passwordList,
      website,
      username,
      password,
      searchInput,
      isPasswordShown,
    } = this.state

    const searchResults = passwordList.filter(eachObj =>
      eachObj.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const renderNoPasswordImage = this.renderNoPasswordImage()

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt="app logo"
          className="app-logo"
        />
        <div className="password-input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-img"
          />
          <div className="input-container">
            <form onSubmit={this.onAddWebsite}>
              <h1 className="form-heading"> Add New Password </h1>
              <div className="each-input-field">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                  alt="website"
                  className="input-img"
                />
                <hr className="seperator" />
                <input
                  value={website}
                  onChange={this.onChangeWebsite}
                  className="input"
                  placeholder="Enter Website"
                  type="text"
                />
              </div>

              <div className="each-input-field">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-img"
                />
                <hr className="seperator" />
                <input
                  value={username}
                  onChange={this.onChangeUsername}
                  className="input"
                  placeholder="Enter Username"
                  type="text"
                />
              </div>

              <div className="each-input-field">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-img"
                />
                <hr className="seperator" />
                <input
                  value={password}
                  onChange={this.onChangePassword}
                  className="input"
                  placeholder="Enter Password"
                  type="password"
                />
              </div>
              <div className="btn-container">
                <button type="submit" className="button" testid="delete">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="password-display-container">
          <div className="password-searchbar-container">
            <div>
              <h1 className="passwords-count">Your Passwords</h1>
              <p className="count"> {searchResults.length} </p>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="searchbar-img"
              />
              <hr className="seperator" />
              <input
                value={searchInput}
                onChange={this.onChangeSearchInput}
                className="input"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>

          <hr className />

          <div className="checkbox-container">
            <button
              type="button"
              onClick={this.onClickShowPassword}
              className="tick-btn"
            >
              <input type="checkbox" id="myCheckbox" />
              <label
                htmlFor="myCheckbox"
                className="passwords-count"
                id="label"
              >
                Show Passwords
              </label>
            </button>
          </div>

          {searchResults.length === 0 ? (
            renderNoPasswordImage
          ) : (
            <ul className="ul-container">
              {searchResults.map(eachObj => (
                <PasswordItem
                  key={eachObj.id}
                  eachObj={eachObj}
                  deleteItem={this.deleteItem}
                  isPasswordShown={isPasswordShown}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Password
