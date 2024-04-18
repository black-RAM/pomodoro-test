import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import { useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import "./Content.scss"

const Input = ({factor, value, incrementor, decrementor}) => {
  const valueWidth = Math.max(value * window.innerWidth / 250, 14)

  return (
    <form className="input">
      <h2 id={`${factor}-label`} className="input-header">{`${factor} length`}</h2>
      <div className="input-buttons">
        <button type="button" id={`${factor}-decrement`} onClick={decrementor}>-</button>
        <time id={`${factor}-length`} dateTime={`PT0H${value}M`} style={{width: valueWidth}}>{`${value}`}</time>
        <button type="button" id={`${factor}-increment`} onClick={incrementor}>+</button>
      </div>
    </form>
  )
}

Input.propTypes = {
  factor: PropTypes.string,
  value: PropTypes.number,
  incrementor: PropTypes.func,
  decrementor: PropTypes.func,
}

const Display = ({title, currentTime, initialMinutes}) => {
  const parser = (d = new Date()) => {
    const minutes = String(d.getHours() * 60 + d.getMinutes()).padStart(2, 0)
    const seconds = String(d.getSeconds()).padStart(2, 0)
    return minutes + ":" + seconds
  }

  const getSecondsOfHour = (d = new Date()) => {
    return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()
  }

  const seconds = {
    initial: getSecondsOfHour(new Date(0, 0, 0, 0, initialMinutes)),
    current: getSecondsOfHour(currentTime)
  }

  const completedDifference = seconds.initial - seconds.current
  const completedPercentage = completedDifference / seconds.initial * 100

  return (
    <section>
      <CircularProgressbarWithChildren 
        value={completedPercentage}
        styles={buildStyles({
          pathColor: "#FA7070",
          trailColor: "#C6EBC5"
        })}>
        <h1 id="timer-label">{title}</h1>
        <time id="time-left" dateTime={currentTime.toTimeString()}>{parser(currentTime)}</time>
      </CircularProgressbarWithChildren>
    </section>
  )
}

Display.propTypes = {
  title: PropTypes.string,
  currentTime: PropTypes.instanceOf(Date),
  initialMinutes: PropTypes.number
}

const Controls = ({toggler, resetter, restorer}) => {
  return (
    <section className="centered-children">
      <button type="button" id="reset" onClick={resetter}>Reset</button>
      <button type="button" id="restart" onClick={restorer}>Restart</button>
      <button type="button" id="start_stop" onClick={toggler}>Start/Stop</button>
    </section>
  )
}

Controls.propTypes = {
  toggler: PropTypes.func,
  resetter: PropTypes.func,
  restorer: PropTypes.func
}

const Beeper = ({trigger}) => {
  const audio = useMemo(() => new Audio("./assets/beep.wav"), [])

  useEffect(() => {
    audio.play()
    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [audio, trigger])

  return <audio src="./assets/beep.wav" id="beep"></audio>
}

Beeper.propTypes = {
  trigger: PropTypes.bool
}

export { Input, Display, Controls, Beeper }