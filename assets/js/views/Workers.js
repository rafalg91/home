import React, { useEffect, useState, useRef } from "react"

const Workers = () => {
  const [workerList, setWorkerList] = useState([])
  const [filteredWorkers, setFilteredWorkers] = useState([])

  const input = useRef()

  useEffect(() => {
    fetch('http://localhost:8000/api/workers')
      .then(res => res.json())
      .then(json => {
        setWorkerList(json)
        setFilteredWorkers(json)
      })
  }, [])

  const searchWorkers = (e) => {
    e.preventDefault()
    const workers = workerList.filter((worker) => {
      return worker.name.includes(input.current.value)
    })

    setFilteredWorkers(workers)
  }

  const addWorker = () => {
    setWorkerList([
      ...workerList,
      {
        id: workerList.length + 1,
        name: input.current.value,
      },
    ])
  }

  return (
    <>
      <h2 className="title is-5">Workers</h2>
      <div className="field has-addons my-5">
        <div className="control">
          <input ref={input} className="input" type="text" placeholder="Find a repository" />
        </div>
        <div className="control">
          <a className="button is-primary" onClick={searchWorkers}>
            Search
          </a>
        </div>
      </div>
      <table className="table is-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button is-info" onClick={addWorker}>
        Add Worker
      </button>
    </>
  )
}

export default Workers
