import { useEffect, useRef, useState } from 'react';
import Welcome from '../Welcome/Welcome';
import Screen from '../Screen/Screen';
import Menu from '../Menu/Menu';
import Leaderboard from '../Leaderboard/Leaderboard';
import { db } from '../../firebase-config';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import music from '../../audio/music.mp3'
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [usernameExists, setUsernameExists] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [difficulty, setDifficulty] = useState('Easy');
  const [showMenu, setShowMenu] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isMusicToggled, setIsMusicToggled] = useState(true);
  const musicRef = useRef(new Audio(music))

  function startGame() {
    setIsGameStarted(true);
    setShowMenu(false);
    setScore(0);
    setMisses(0);

    if (isMusicToggled) {
      musicRef.current.volume = .2;
      musicRef.current.loop = true;
      musicRef.current.play()
    }
  }

  async function stopGame() {
    musicRef.current.pause();
    musicRef.current.currentTime = 0;
    
    setIsGameStarted(false);
    setShowMenu(true);

    if (score > user[difficulty]) {
      await updateDoc(doc(db, 'users', user.username), {
        [difficulty]: score
      })
      getUser()
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

  function toggleLeaderboard() {
    setShowMenu(prev => !prev)
    setShowLeaderboard(prev => !prev)
  }

  async function createUser(username) {
    let usernameIsFree = true

    users.forEach(user => {
      if (user.username === username) {
        usernameIsFree = false
        return
      }
    })

    if (usernameIsFree) {
      setUsernameExists(false)
      
      const user = {
        username,
        Easy: 0,
        Normal: 0,
        Hard: 0,
      }

      await setDoc(doc(db, 'users', username), user)
      //console.log('created user', user);
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
    } 
    else {
      setUsernameExists(true)
    }
  }

  function changeLeaderboardByDifficulty(difficulty) {
    setLeaderboard([...users].sort((a, b) => b[difficulty] - a[difficulty]))
  }

  async function getUser() {
    try {
      const userUpdated = await getDoc(doc(db, 'users', user.username))
      const userUpdatedData = userUpdated.data()
      //console.log('userUpdated', userUpdatedData);
      setUser(userUpdatedData)
      localStorage.setItem('user', JSON.stringify(userUpdatedData))  
    } catch (error) {
      console.log(error);
    }
  }

  async function getUsers() {
    try {
      const users = await getDocs(collection(db, 'users'))
      const usersArray = users.docs.map(user => user.data())

      setUsers(usersArray)
      changeLeaderboardByDifficulty(difficulty)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
    getUser()
  }, [])

  return (
    // [TODO]: HOC for menu
    <div className="app">
      {!user && <Welcome createUser={createUser} usernameExists={usernameExists} />}
      {user && showMenu && <Menu 
                            user={user} 
                            startGame={startGame} 
                            score={score} 
                            difficulty={difficulty}
                            changeDifficulty={changeDifficulty}
                            toggleLeaderboard={toggleLeaderboard}
                            isMusicToggled={isMusicToggled}
                            toggleMusic={() => setIsMusicToggled(prev => !prev)}
      />}
      {showLeaderboard && <Leaderboard 
                            leaderboard={leaderboard} 
                            toggleLeaderboard={toggleLeaderboard} 
                            changeLeaderboardByDifficulty={changeLeaderboardByDifficulty} 
                            getUsers={getUsers}
      />}
      <Screen 
        user={user}
        isGameStarted={isGameStarted} 
        stopGame={stopGame} 
        score={score} 
        addScore={addScore}
        misses={misses}
        addMisses={addMisses}
        difficulty={difficulty}
      />
      <div className="music"><audio src='../../audio/music.mp3'></audio></div>
    </div>
  );
}

export default App;
