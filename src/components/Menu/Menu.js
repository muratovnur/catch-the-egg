import React from 'react'
import './Menu.css'

const Menu = ({ startGame, score, bestScore, difficulty, changeDifficulty }) => {

  function handleChangeDifficulty(e) {
    changeDifficulty(e.target.name)
  }

  return (
    <div className='menu'>
      <div className="menu__container">
        <h2 className='menu__title'>Menu</h2>
        {bestScore !== 0 && <span className='menu__score-text'>Best Score: <span className='menu__score-value'>{bestScore[difficulty]}</span></span>}
        {score === 0 
          ? <button className='menu__button menu__button-start' onClick={startGame}>Start</button>
          : <>
              <span className='menu__score-text'>Your Score: <span className='menu__score-value'>{score}</span></span>
              <button className='menu__button menu__button-start' onClick={startGame}>Restart</button>
            </>
        }
        <div className="menu__buttons-difficulty">
          <button className={`menu__button ${difficulty === 'Easy' && 'menu__button_active'}`} name='Easy' onClick={handleChangeDifficulty}>Easy</button>
          <button className={`menu__button ${difficulty === 'Normal' && 'menu__button_active'}`} name='Normal' onClick={handleChangeDifficulty}>Normal</button>
          <button className={`menu__button ${difficulty === 'Hard' && 'menu__button_active'}`} name='Hard' onClick={handleChangeDifficulty}>Hard</button>
        </div>
      </div>
    </div>
  )
}

export default Menu