import { Input, Display, Controls } from "./Content"


function Clock() {
  return (
    <main>
      <Input factor={"break"} value={5} />
      <Input factor={"session"} value={25}/>
      <Display title={"Session"} dateTime={new Date().setMinutes(25, 0)} />
      <Controls />
    </main>
  )
}

export default Clock
