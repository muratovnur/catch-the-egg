import './App.css';
import Screen from '../Screen/Screen';
import Menu from '../Menu/Menu';
import Leaderboard from '../Leaderboard/Leaderboard';
import { useRef, useState } from 'react';
import music from '../../audio/music.mp3'

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem('best')) || {'Easy': 0, 'Normal': 0, 'Hard': 0});
  const [misses, setMisses] = useState(0);
  const [difficulty, setDifficulty] = useState('Easy');
  const [showMenu, setShowMenu] = useState(true);
  const [leaderboard, setLeaderboard] = useState(JSON.parse(localStorage.getItem('leaderboard')) || [{name: 'user2', score: 17}, {name: 'user1', score: 12}]);
  const musicRef = useRef(new Audio(music))
  
  
  // console.log('bestScore local', localStorage.getItem('best'));
  // console.log('bestScore', bestScore);


  function startGame() {
    setIsGameStarted(true);
    setShowMenu(false);
    setScore(0);
    setMisses(0);

    musicRef.current.volume = .2;
    musicRef.current.loop = true;
    musicRef.current.play()
  }

  function stopGame() {
    musicRef.current.pause();
    musicRef.current.currentTime = 0;
    
    setIsGameStarted(false);
    setShowMenu(true);

    if (score > bestScore[difficulty]) {
      //[TODO]: optimize saving best score
      setBestScore(prev => {return {...prev, [difficulty]: score}})
      localStorage.setItem('best', JSON.stringify({...bestScore, [difficulty]: score}));
      console.log('bestScore', localStorage.getItem('best'));
    }
  }

  function addScore() {
    setScore(prev => prev + 1);
  }

  function addMisses() {
    setMisses(prev => prev + 1);
  }

  function changeDifficulty(difficulty) {
    setDifficulty(difficulty)
  }

  console.log('app');

  return (
    <div className="app">
      {false && <Menu 
                      startGame={startGame} 
                      score={score} 
                      bestScore={bestScore} 
                      difficulty={difficulty}
                      changeDifficulty={changeDifficulty}
      />}
      <Screen 
        isGameStarted={isGameStarted} 
        stopGame={stopGame} 
        score={score} 
        addScore={addScore}
        bestScore={bestScore}
        misses={misses}
        addMisses={addMisses}
        difficulty={difficulty}
      />
      <Leaderboard leaderboard={leaderboard}></Leaderboard>
      <div className="music"><audio src='../../audio/music.mp3'></audio></div>
    </div>
    
  );
}

export default App;
