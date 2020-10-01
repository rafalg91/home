import React, { useEffect, useState, useRef } from "react"
import Add from "./Workers/Add"
import Search from "./Workers/Search"

const Workers = () => {
  const [workerList, setWorkerList] = useState([])
  const [filteredWorkers, setFilteredWorkers] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetch("/api/workers")
    .then((res) => res.json())
    .then((json) => {
      setWorkerList(json)
      setFilteredWorkers(json)
    })
  }

  const deleteWorker = (idWorker) => {
    fetch(`/api/workers/${idWorker}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => console.log(json))

    setFilteredWorkers(workerList.filter(worker => {
      return worker.id !== idWorker
    }))

    setWorkerList(workerList.filter(worker => {
      return worker.id !== idWorker
    }))
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
            <th>Action</th>
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
            </tr>
          ))}
        </tbody>
      </table>
      <Add />
    </>
  )
}

export default Workers
