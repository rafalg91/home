import React, {useRef} from "react"

const Add = ({ setWorkerList, setFilteredWorkers }) => {
  const input = useRef()

  const addWorker = () => {
    fetch("/api/workers/add", {
      method: "POST",
      body: JSON.stringify({ name: input.current.value }),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then((json) => {
      setWorkerList(json)
      setFilteredWorkers(json)
    })

    input.current.value = ''
  }

  return (
    <div className="field has-addons my-5">
      <div className="control">
        <input
          ref={input}
          className="input"
          type="text"
          placeholder="Name..."
        />
      </div>
      <div className="control">
        <a className="button is-primary" onClick={addWorker}>
          Add
        </a>
      </div>
    </div>
  )
}

export default Add
