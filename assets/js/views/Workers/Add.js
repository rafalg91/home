import React, {useRef} from "react"

const Add = () => {
  const input = useRef()

  const addWorker = () => {
    fetch("/api/workers/add", {
      method: "POST",
      body: JSON.stringify({ name: input.current.value }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
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
