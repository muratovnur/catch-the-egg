import React from 'react'
import './Menu.css'

const Menu = ({ startGame, score, user, difficulty, changeDifficulty, toggleLeaderboard, isMusicToggled, toggleMusic }) => {

  function handleChangeDifficulty(e) {
    changeDifficulty(e.target.name)
  }

  return (
    <div className='menu'>
      <div className="menu__container">
        <h2 className='menu__title'>Menu</h2>
        {user && <span className='menu__score-text'>Best Score: <span className='menu__score-value'>{user[difficulty]}</span></span>}
        {score === 0 
          ? <button className='menu__button menu__button_start' onClick={startGame}>Start</button>
          : <>
              <span className='menu__score-text'>Your Score: <span className='menu__score-value'>{score}</span></span>
              <button className='menu__button menu__button_start' onClick={startGame}>Restart</button>
            </>
        }
        <button className='menu__button menu__button_leaderboard' onClick={toggleLeaderboard}>Leaderboard</button>
        
        <div className="menu__buttons-difficulty">
          <button className={`menu__button ${difficulty === 'Easy' && 'menu__button_active'}`} name='Easy' onClick={handleChangeDifficulty}>Easy</button>
          <button className={`menu__button ${difficulty === 'Normal' && 'menu__button_active'}`} name='Normal' onClick={handleChangeDifficulty}>Normal</button>
          <button className={`menu__button ${difficulty === 'Hard' && 'menu__button_active'}`} name='Hard' onClick={handleChangeDifficulty}>Hard</button>
        </div>
        <div className='menu__additional'>
          <span className='menu__username'>Username: {user.username}</span>
          <div className="menu__toggle-music" style={{backgroundColor: isMusicToggled ? '#ffffff80' : '#ffffff'}} onClick={toggleMusic}></div>
        </div>
      </div>
    </div>
  )
}

export default Menu