import { useEffect, useRef, useState } from 'react'
import Egg from '../Egg/Egg';
import './Screen.css'

const Screen = () => {
  const [wolfPos, setWolfPos] = useState('left');
  const [basketPos, setBasketPos] = useState('bottom');
  const [tick, setTick] = useState(0);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [start00, setStart00] = useState(false);
  const [start01, setStart01] = useState(false);
  const [start10, setStart10] = useState(false);
  const [start11, setStart11] = useState(false);
  const difficulty = useRef(1000);

  useEffect(() => {
    window.addEventListener('keydown', handlePositions)

    const tickInterval = setInterval(() => {
      if (misses) {
        console.log('game over');
        window.removeEventListener('keydown', handlePositions)
        clearInterval(tickInterval)
      }
      else {
        setTick(prev => prev + 1)
        if (tick % 2 === 0) generateRandomRoll()
      }
      console.log(tick);
    }, difficulty.current)

    return () => {
      window.removeEventListener('keydown', handlePositions)
      clearInterval(tickInterval)
    }
  }, [tick])

  function endGame() {

  }

  function generateRandomRoll() {
    let num = Math.floor(Math.random() * 10) % 4;
    console.log('random', num);

    switch (num) {
      case 0:
        start00 ? setStart01(true) : setStart00(true)
        break;
      case 1:
        start01 ? setStart00(true) : setStart01(true)
        break;
      case 2:
        start10 ? setStart11(true) : setStart10(true)
        break;
      case 3:
        start11 ? setStart10(true) : setStart11(true)
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
      setScore(prev => prev + 1)
    }
    else {
      setMisses(prev => prev + 1)
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
      <span>Score: {score} Misses: {misses}</span>

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
      />
      <Egg
        key='01'
        tick={tick} 
        eggPosX='left' 
        eggPosY='top'
        checkIsEggCollected={checkIsEggCollected}
        stopEggRoll={stopEggRoll01}
        startRoll={start01}
      />
      <Egg
        key='10'
        tick={tick} 
        eggPosX='right' 
        eggPosY='bottom'
        checkIsEggCollected={checkIsEggCollected}
        stopEggRoll={stopEggRoll10}
        startRoll={start10}
      />
      <Egg
        key='11'
        tick={tick} 
        eggPosX='right' 
        eggPosY='top'
        checkIsEggCollected={checkIsEggCollected}
        stopEggRoll={stopEggRoll11}
        startRoll={start11}
      />
    </div>
  )
}

export default Screen