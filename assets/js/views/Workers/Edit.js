import React, {useState, useRef} from 'react'
import classNames from "classnames/dedupe"

const Edit = ({ setWorkerList, setFilteredWorkers, name, id }) => {
  const input = useRef()
  const [modal, setModal] = useState(false)

  const editWorker = () => {
    fetch(`/api/workers/${id}/edit`, {
      method: "PATCH",
      body: JSON.stringify({ name: input.current.value }),
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(json => {
      setWorkerList(json)
      setFilteredWorkers(json)
    })

    setModal(false)
  }

  return (
    <>
      <button className="button is-info is-small" onClick={() => setModal(true)}>
        Edit
      </button>
      <div className={classNames('modal', {'is-active': modal})}>
        <div className="modal-background" onClick={() => setModal(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit Worker</p>
            <button className="delete" aria-label="close" onClick={() => setModal(false)}></button>
          </header>
          <section className="modal-card-body">
            <div className="control">
              <input
                ref={input}
                className="input"
                type="text"
                placeholder={name}
              />
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success"onClick={editWorker}>Save changes</button>
            <button className="button" onClick={() => setModal(false)}>Cancel</button>
          </footer>
        </div>
      </div>
    </>
  )
}

export default Edit