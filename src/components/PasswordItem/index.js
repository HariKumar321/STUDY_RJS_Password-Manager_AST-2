import './index.css'

const PasswordItem = props => {
  const {eachObj, isPasswordShown, deleteItem} = props
  const {id, website, username, password} = eachObj

  const firstChar = website.slice(0, 1).toUpperCase()

  const onDeleteItem = () => {
    deleteItem(id)
  }

  const passwordTrigger = isPasswordShown ? (
    <p> {password} </p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="star-img"
    />
  )

  return (
    <li className="password-card">
      <p className="first-char"> {firstChar} </p>
      <div className="data">
        <p> {website} </p>
        <p> {username} </p>
        {passwordTrigger}
      </div>
      <button onClick={onDeleteItem} type="button" className="delete-btn">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
