import React, { useEffect, useState } from "react"
import Add from "./Workers/Add"
import Search from "./Workers/Search"
import Edit from "./Workers/Edit"
import Delete from "./Workers/Delete"
import Skills from "./Workers/Skills"
import AddSkill from "./Workers/AddSkill"

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

  return (
    <>
      <div className="columns">
        <div className="column is-7">
          <h2 className="title is-6">Workers</h2>
          <Search workers={workerList} setWorkers={setFilteredWorkers} />
          <table className="table is-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Skills</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.name}</td>
                  <td>{worker.surname}</td>
                  <td>
                    <Skills skills={worker.skills} worker={worker.id} />
                  </td>
                  <td>
                    <div className="buttons">
                      <Delete
                        setWorkerList={setWorkerList}
                        setFilteredWorkers={setFilteredWorkers}
                        id={worker.id}
                      />
                      <Edit
                        setWorkerList={setWorkerList}
                        setFilteredWorkers={setFilteredWorkers}
                        id={worker.id}
                        name={worker.name}
                        surname={worker.surname}
                      />
                      <AddSkill
                        worker={worker.id}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column is-4">
          <Add setWorkerList={setWorkerList} setFilteredWorkers={setFilteredWorkers} />
        </div>
      </div>
    </>
  )
}

export default Workers
