import { Input, Display, Controls } from "./Content"
import { useState, useEffect, useRef } from "react"

function Clock() {
  const [settings, calibrate] = useState({
    sessionLength: 25,
    breakLength: 5,
  })

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

  const toggleTimer = () => {
    if(running.isPaused) {
      intervalID.current = setInterval(() => {
        setRunning(lastRun => {
          return {
            ...lastRun,
            time: new Date(lastRun.time.getTime() - 1000)
          }
        })
      }, 1000)
    } else {
      clearInterval(intervalID.current)
    }
    running.isPaused = !running.isPaused
  }

  const resetTimer = () => {
    clearInterval(intervalID.current)
    setRunning(lastRun => {
      const defaultTime = new Date()
      defaultTime.setMinutes(lastRun.isSession ? settings.sessionLength : settings.breakLength, 0)
      return {
        ...lastRun,
        time: defaultTime
      }
    })
  }

  useEffect(resetTimer, [settings])


  return (
    <main>
      <Input factor={"break"} value={settings.breakLength} incrementor={breakIncrement} decrementor={breakDecrement} />
      <Input factor={"session"} value={settings.sessionLength} incrementor={sessionIncrement} decrementor={sessionDecrement} />
      <Display title={running.isSession ? "Session" : "Break"} dateTime={running.time} />
      <Controls toggler={toggleTimer} resetter={resetTimer} />
    </main>
  )
}

export default Clock
