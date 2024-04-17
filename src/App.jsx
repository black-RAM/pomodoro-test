import { Input, Display, Controls, Beeper } from "./Content"
import { useState, useReducer, useEffect, useRef } from "react"

const INCREMENT = "INCREMENT"
const DECREMENT = "DECREMENT"
const RESET = "RESET"

const defaultState = Object.freeze({
  sessionLength: 25,
  breakLength: 5,
})

function calibrator(state, action) {
  if(action.type == INCREMENT && state[action.property] < 60){
    return {...state, [action.property]: state[action.property] + 1}
  } else if(action.type == DECREMENT && state[action.property] > 1) {
    return {...state, [action.property]: state[action.property] - 1}
  } else if(action.type == RESET) {
    return defaultState
  } else {
    return state
  }
}

function Clock() {
  const [settings, calibration] = useReducer(calibrator, defaultState)

  const [running, setRunning] = useState({
    time: new Date(),
    isSession: true,
    isPaused: true,
  })

  const intervalID = useRef(null)

  const resetTimer = () => {
    clearInterval(intervalID.current)
    setRunning(lastRun => {
      const startTime = new Date()
      startTime.setHours(0, lastRun.isSession ? settings.sessionLength : settings.breakLength, 0)
      return {...lastRun, time: startTime}
    })
  }

  const toggleTimer = () => {
    if(running.isPaused) {
      intervalID.current = setInterval(() => {
        setRunning(lastRun => {
          const timeIsLeft = lastRun.time.getMinutes() * 60 + lastRun.time.getSeconds() > 0
          const newState = {...lastRun, isPaused: false}
          if(timeIsLeft) {
            newState.time = new Date(lastRun.time.getTime() - 1000)
          } else {
            newState.isSession = !lastRun.isSession
            resetTimer()
            toggleTimer()
          }
          return newState
        })
      }, 1000)
    } else if(intervalID.current) {
      clearInterval(intervalID.current)
      setRunning(last => ({...last, isPaused: true}))
    }
  }

  const resetClock = () => {
    setRunning(last => ({...last, isSession: true}))
    calibration({type: RESET})
  }

  useEffect(resetTimer, [settings])
  
  return (
    <main>
      <Input 
        factor={"break"} 
        value={settings.breakLength} 
        incrementor={() => calibration({type: INCREMENT, property: "breakLength"})} 
        decrementor={() => calibration({type: DECREMENT, property: "breakLength"})} />
      <Input 
        factor={"session"} 
        value={settings.sessionLength} 
        incrementor={() => calibration({type: INCREMENT, property: "sessionLength"})} 
        decrementor={() => calibration({type: DECREMENT, property: "sessionLength"})} />
      <Display 
        title={running.isSession ? "Session" : "Break"}  
        dateTime={running.time} />
      <Controls 
        toggler={toggleTimer} 
        restorer={resetTimer} 
        resetter={resetClock} />
      <Beeper 
        trigger={running.isSession} />
    </main>
  )
}

export default Clock
