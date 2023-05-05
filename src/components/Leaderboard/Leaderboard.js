import React, { useEffect, useState } from 'react'
import './Leaderboard.css'

const Leaderboard = ({ leaderboard, toggleLeaderboard, changeLeaderboardByDifficulty, getUsers }) => {
  const [difficulty, setDifficulty] = useState('Easy')

  useEffect(() => {
    //console.log('fetched users in lb');
    getUsers()
  }, [])

  function handleChangeDifficulty(e) {
    setDifficulty(e.target.name)
    changeLeaderboardByDifficulty(e.target.name)
  }
  
  return (
    <div className='leaderboard'>
      <div className="leaderboard__container">
        <h2 className='leaderboard__title'>Leaderboard</h2>
        <ul className="leaderboard__table">
          <li className="leaderboard__table-item" key='table-headers'>
            <span className='leaderboard__table-user'># NAME</span>
            <span className='leaderboard__table-score'>SCORE</span>
          </li>
          {leaderboard.map((user, index) => {
            return  <li className="leaderboard__table-item" key={user.username}>
                      <span className='leaderboard__table-user'>{index+1}. {user.username}</span>
                      <span className='leaderboard__table-score'>{user[difficulty]}</span>
                    </li>
          })}
        </ul>
        <div className="leaderboard__buttons-difficulty">
          <button className={`leaderboard__button ${difficulty === 'Easy' && 'leaderboard__button_active'}`} name='Easy' onClick={handleChangeDifficulty}>Easy</button>
          <button className={`leaderboard__button ${difficulty === 'Normal' && 'leaderboard__button_active'}`} name='Normal' onClick={handleChangeDifficulty}>Normal</button>
          <button className={`leaderboard__button ${difficulty === 'Hard' && 'leaderboard__button_active'}`} name='Hard' onClick={handleChangeDifficulty}>Hard</button>
        </div>
        <button className='leaderboard__button leaderboard__button_back' name='back' onClick={toggleLeaderboard}>Back</button>
      </div>
    </div>
  )
}

export default Leaderboard