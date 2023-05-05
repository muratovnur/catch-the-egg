import React, { useState } from 'react'
import './Welcome.css'

const Welcome = ({ createUser, usernameExists }) => {
  const [username, setUsername] = useState('');

  function handleCreateUser() {
    createUser(username)
  }

  return (
    <div className='welcome'>
      <div className="welcome__container">
        <h2 className='welcome__title'>Welcome!</h2>
        <label>Enter your username:</label>
        <input type="text" className='welcome__input' onChange={(e) => setUsername(e.target.value)}/>
        <span className='welcome__error' style={{display: usernameExists ? 'block' : 'none'}}>Sorry. Username already taken :(</span>
        <button className={`welcome__button`} onClick={handleCreateUser}>Confirm</button>
      </div>
    </div>
  )
}

export default Welcome