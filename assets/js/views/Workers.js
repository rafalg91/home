import React, { useState } from "react"
import { workers } from "../api"

const Workers = () => {
  const [workerList, setWorkerList] = useState(workers)

  const addWorker = () => {
    setWorkerList([
      ...workerList,
      {
        id: workerList.length + 1,
        name: "Leon",
      },
    ])
  }

  return (
    <>
      <h2 className="title is-5">Workers</h2>
      <table className="table is-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {workerList.map((worker) => (
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
