import PropTypes from "prop-types"
import { format } from "date-fns"

const Input = ({factor, value, incrementor, decrementor}) => {
  return (
    <form>
      <h2 id={`${factor}-label`} style={{textTransform: "capitalize"}}>{`${factor} length`}</h2>
      <button type="button" id={`${factor}-decrement`} onClick={decrementor}>-</button>
      <button type="button" id={`${factor}-length`}>{`${value}`}</button>
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

const Display = ({title, dateTime}) => {
  return (
    <section>
      <h1 id="timer-label">{title}</h1>
      <time id="time-left">{format(dateTime, "mm:ss")}</time>
    </section>
  )
}

Display.propTypes = {
  title: PropTypes.string,
  dateTime: PropTypes.instanceOf(Date)
}

const Controls = ({toggler, resetter}) => {
  return (
    <section>
      <button type="button" id="reset" onClick={resetter}>Reset</button>
      <button type="button" id="start_stop" onClick={toggler}>Start/Stop</button>
    </section>
  )
}

Controls.propTypes = {
  toggler: PropTypes.func,
  resetter: PropTypes.func,
}

export { Input, Display, Controls }