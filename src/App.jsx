import { Input, Display, Controls, Beeper } from "./Content"
import { useState, useEffect, useRef } from "react"

function Clock() {
  const defaultSetting =  () => {
    return {
      sessionLength: 25,
      breakLength: 5,
    }
  }

  const [settings, calibrate] = useState(defaultSetting)

  const [running, setRunning] = useState({
    time: new Date(),
    isSession: true,
    isPaused: true,
  })

  const intervalID = useRef(null)

  const sessionIncrement = () => {
    if(settings.sessionLength < 60) {
      calibrate(previous => {
        return {
          ...previous,
          sessionLength: previous.sessionLength + 1,
        }
      })
    }
  }

  const sessionDecrement = () => {
    if(settings.sessionLength > 1) {
      calibrate(previous => {
        return {
          ...previous,
          sessionLength: previous.sessionLength - 1,
        }
      })
    }
  }
  
  const breakIncrement = () => {
    if(settings.breakLength < 60) {
      calibrate(previous => {
        return {
          ...previous,
          breakLength: previous.breakLength + 1,
        }
      })
    }
  }
  
  const breakDecrement = () => {
    if(settings.breakLength > 1) {
      calibrate(previous => {
        return {
          ...previous,
          breakLength: previous.breakLength - 1,
        }
      })
    }
  }

  const resetTimer = () => {
    clearInterval(intervalID.current)
    setRunning(lastRun => {
      const defaultTime = new Date()
      defaultTime.setHours(0, lastRun.isSession ? settings.sessionLength : settings.breakLength, 0)
      return {...lastRun, time: defaultTime}
    })
  }

  useEffect(resetTimer, [settings])

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
    calibrate(defaultSetting)
    setRunning(last => ({...last, isSession: true}))
  }
  
  return (
    <main>
      <Input factor={"break"} value={settings.breakLength} incrementor={breakIncrement} decrementor={breakDecrement} />
      <Input factor={"session"} value={settings.sessionLength} incrementor={sessionIncrement} decrementor={sessionDecrement} />
      <Display title={running.isSession ? "Session" : "Break"} dateTime={running.time} />
      <Controls toggler={toggleTimer} restorer={resetTimer} resetter={resetClock} />
      <Beeper trigger={running.isSession} />
    </main>
  )
}

export default Clock
