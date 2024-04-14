import PropTypes from "prop-types"

const Input = ({factor, value, incrementor, decrementor}) => {
  return (
    <form>
      <h2 id={`${factor}-label`} style={{textTransform: "capitalize"}}>{`${factor} length`}</h2>
      <button type="button" id={`${factor}-decrement`} onClick={decrementor}>-</button>
      <time id={`${factor}-length`} dateTime={`PT0H${value}M`}>{`${value}`}</time>
      <button type="button" id={`${factor}-increment`} onClick={incrementor}>+</button>
    </form>
  )
}

Input.propTypes = {
  factor: PropTypes.string,
  value: PropTypes.number,
  incrementor: PropTypes.func,
  decrementor: PropTypes.func,
}

const Display = ({title, dateTime = new Date()}) => {
  const parser = (d = new Date()) => {
    const minutes = String(d.getHours() * 60 + d.getMinutes()).padStart(2, 0)
    const seconds = String(d.getSeconds()).padStart(2, 0)
    return minutes + ":" + seconds
  }
  return (
    <section>
      <h1 id="timer-label">{title}</h1>
      <time id="time-left" dateTime={dateTime.toTimeString()}>{parser(dateTime)}</time>
    </section>
  )
}

Display.propTypes = {
  title: PropTypes.string,
  dateTime: PropTypes.instanceOf(Date)
}

const Controls = ({toggler, resetter, restorer}) => {
  return (
    <section>
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

export { Input, Display, Controls }