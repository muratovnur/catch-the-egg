import React, { memo, useEffect, useState } from 'react'
import './Egg.css'

const Egg = ({ 
  tick, eggPosX, eggPosY, checkIsEggCollected, startRoll, stopEggRoll, isReset 
}) => {
  
  const [eggStep, setEggStep] = useState(0);
  
  function rollEgg() {
    //console.log('they see me rolling, they hating', {startRoll}, {eggStep});
    if (eggStep < 5) {
      setEggStep(prev => prev + 1)
    }
    else {
      checkIsEggCollected(eggPosX, eggPosY)
      stopEggRoll()
      setEggStep(0)
    }
  }

  useEffect(() => {
    if (startRoll) {
      rollEgg()
    }
    if (isReset) {
      setEggStep(0)
    }
  }, [tick, isReset])

  return (
    <div className={`egg egg_${eggPosY}-${eggPosX}-${eggStep} egg_${eggPosX}`}></div>
  )
}

export default Egg;