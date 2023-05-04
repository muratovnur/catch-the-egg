import React, { useState } from 'react'
import './Leaderboard.css'

const Leaderboard = ({ leaderboard }) => {
  const [difficulty, setDifficulty] = useState('Easy')

  function handleChangeDifficulty(e) {
    setDifficulty(e.target.name)
  }
  console.log(leaderboard);
  return (
    <div className='leaderboard'>
      <div className="leaderboard__container">
        <h2 className='leaderboard__title'>Leaderboard</h2>
        <ul className="leaderboard__table">
          <li className="leaderboard__table-item" key={0}>
            <span className='leaderboard__table-user'># NAME</span>
            <span className='leaderboard__table-score'>SCORE</span>
          </li>
          {leaderboard.map((user, index) => {
            return  <li className="leaderboard__table-item" key={user}>
                      <span className='leaderboard__table-user'>{index+1}. {user.name}</span>
                      <span className='leaderboard__table-score'>{user.score}</span>
                    </li>
          })}
        </ul>
        <div className="leaderboard__buttons-difficulty">
          <button className={`leaderboard__button ${difficulty === 'Easy' && 'leaderboard__button_active'}`} name='Easy' onClick={handleChangeDifficulty}>Easy</button>
          <button className={`leaderboard__button ${difficulty === 'Normal' && 'leaderboard__button_active'}`} name='Normal' onClick={handleChangeDifficulty}>Normal</button>
          <button className={`leaderboard__button ${difficulty === 'Hard' && 'leaderboard__button_active'}`} name='Hard' onClick={handleChangeDifficulty}>Hard</button>
        </div>
        <button className={`leaderboard__button`} name='back' onClick={handleChangeDifficulty}>Back</button>
      </div>
    </div>
  )
}

export default Leaderboard