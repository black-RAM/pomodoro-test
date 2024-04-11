import PropTypes from "prop-types"
import { format } from "date-fns"

const Input = ({factor, value}) => {
  return (
    <form>
      <h2 id={`${factor}-label`} style={{textTransform: "capitalize"}}>{`${factor} length`}</h2>
      <button type="button" id={`${factor}-decrement`}>-</button>
      <button type="button" id={`${factor}-length`}>{`${value}`}</button>
      <button type="button" id={`${factor}-increment`}>+</button>
    </form>
  )
}

Input.propTypes = {
  factor: PropTypes.string,
  value: PropTypes.number
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

const Controls = () => {
  return (
    <section>
      <button type="button" id="reset">Reset</button>
      <button type="button" id="start_stop">Start/Stop</button>
    </section>
  )
}

export { Input, Display, Controls }