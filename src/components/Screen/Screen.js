import { useEffect, useRef, useState } from 'react'
import Egg from '../Egg/Egg';
import './Screen.css'

const Screen = ({ 
  isGameStarted, stopGame, score, bestScore, addScore, misses, addMisses, difficulty
}) => {
  const [wolfPos, setWolfPos] = useState('left');
  const [basketPos, setBasketPos] = useState('bottom');
  const [tick, setTick] = useState(0);
  const [isReset, setIsReset] = useState(false);
  const [start00, setStart00] = useState(false);
  const [start01, setStart01] = useState(false);
  const [start10, setStart10] = useState(false);
  const [start11, setStart11] = useState(false);
  const currentDifficulty = useRef(1000);

  useEffect(() => {
    if (difficulty === 'Easy') currentDifficulty.current = 1000
    else if (difficulty === 'Normal') currentDifficulty.current = 600
    else if (difficulty === 'Hard') currentDifficulty.current = 300

    console.log('diff', currentDifficulty.current);
  }, [difficulty])

  useEffect(() => {
    setIsReset(false)
    window.addEventListener('keydown', handlePositions)

    const tickInterval = setInterval(() => {
      if (isGameStarted) {
        if (misses) {
          console.log('game over');
          stopGame();
          resetEggs();
          window.removeEventListener('keydown', handlePositions)
          clearInterval(tickInterval)
        }
        else {
          setTick(prev => prev + 1)
          if (tick % 2 === 0) generateRandomRoll()
        }
      }
    }, currentDifficulty.current)

    return () => {
      window.removeEventListener('keydown', handlePositions)
      clearInterval(tickInterval)
    }
  }, [tick, misses, isGameStarted])

  function resetEggs() {
    setIsReset(true)
    setStart00(false)
    setStart01(false)
    setStart10(false)
    setStart11(false)
  }

  function generateRandomRoll() {
    let num = Math.floor(Math.random() * 10) % 4;

    switch (num) {
      case 0:
        start00 ? (start01 ? setStart11(true) : setStart01(true)) : setStart00(true)
        break;
      case 1:
        start01 ? (start00 ? setStart11(true) : setStart00(true)) : setStart01(true)
        break;
      case 2:
        start10 ? (start11 ? setStart01(true) : setStart11(true)) : setStart10(true)
        break;
      case 3:
        start11 ? (start10 ? setStart01(true) : setStart10(true)) : setStart11(true)
        break;
      default:
        break;
    }
  }

  function stopEggRoll00() {
    setStart00(false);
  }

  function stopEggRoll01() {
    setStart01(false);
  }

  function stopEggRoll10() {
    setStart10(false);
  }

  function stopEggRoll11() {
    setStart11(false);
  }

  function checkIsEggCollected(eggPosX, eggPosY) {
    if (basketPos === eggPosY && wolfPos === eggPosX) {
      addScore()
    }
    else {
      addMisses()
    }
  }

  function handlePositions(event) {
    if (event.key === 'ArrowRight') {
      setWolfPos('right');
    }
    else if (event.key === 'ArrowLeft') {
      setWolfPos('left');
    }
    else if (event.key === 'ArrowUp') {
      setBasketPos('top');
    }
    else if (event.key === 'ArrowDown') {
      setBasketPos('bottom');
    }
  }

  function renderBasket() {
    if (basketPos === 'bottom') {
      if (wolfPos === 'left') {
        return <div className="basket basket_bottom basket_0-0"></div>
      }
      else {
        return <div className="basket basket_bottom basket_1-0"></div>
      }
    }
    else {
      if (wolfPos === 'right') {
        return <div className="basket basket_top basket_1-1"></div>
      }
      else {
        return <div className="basket basket_top basket_0-1"></div>
      }
    }
  }

  return (
    <div className='screen'>
      <div className='screen__scores'>Score: {score} Best: {bestScore[difficulty]}</div>
      <div className={`screen__misses`} style={{'width': `${38*misses}px`}}></div>

      <div className={`wolf wolf_left ${wolfPos === 'left' && 'wolf_display'}`}></div>
      <div className={`wolf wolf_right ${wolfPos === 'right' && 'wolf_display'}`}></div>

      {renderBasket()}

      <Egg
        key='00' 
        tick={tick} 
        eggPosX='left' 
        eggPosY='bottom'
        checkIsEggCollected={checkIsEggCollected}
        stopEggRoll={stopEggRoll00}
        startRoll={start00}
        isReset={isReset}
      />
      <Egg
        key='01'
        tick={tick} 
        eggPosX='left' 
        eggPosY='top'
        checkIsEggCollected={checkIsEggCollected}
        stopEggRoll={stopEggRoll01}
        startRoll={start01}
        isReset={isReset}
      />
      <Egg
        key='10'
        tick={tick} 
        eggPosX='right' 
        eggPosY='bottom'
        checkIsEggCollected={checkIsEggCollected}
        stopEggRoll={stopEggRoll10}
        startRoll={start10}
        isReset={isReset}
      />
      <Egg
        key='11'
        tick={tick} 
        eggPosX='right' 
        eggPosY='top'
        checkIsEggCollected={checkIsEggCollected}
        stopEggRoll={stopEggRoll11}
        startRoll={start11}
        isReset={isReset}
      />
    </div>
  )
}

export default Screen