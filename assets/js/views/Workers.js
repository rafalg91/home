import React, { useEffect, useState } from "react"
import Add from "./Workers/Add"
import Search from "./Workers/Search"
import Edit from "./Workers/Edit"

const Workers = () => {
  const [workerList, setWorkerList] = useState([])
  const [filteredWorkers, setFilteredWorkers] = useState([])

  useEffect(() => {
    fetch("/api/workers")
    .then((res) => res.json())
    .then((json) => {
      setWorkerList(json)
      setFilteredWorkers(json)
    })
  }, [])

  const deleteWorker = (id) => {
    fetch(`/api/workers/${id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((json) => {
      setWorkerList(json)
      setFilteredWorkers(json)
    })
  }

  return (
    <>
      <h2 className="title is-5">Workers</h2>
      <Search workers={workerList} setWorkers={setFilteredWorkers} />
      <table className="table is-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.name}</td>
              <td>
                <button
                  className="button is-danger is-small"
                  onClick={() => deleteWorker(worker.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <Edit
                  setWorkerList={setWorkerList}
                  setFilteredWorkers={setFilteredWorkers}
                  id={worker.id}
                  name={worker.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Add setWorkerList={setWorkerList} setFilteredWorkers={setFilteredWorkers} />
    </>
  )
}

export default Workers
