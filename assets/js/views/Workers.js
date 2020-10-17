import React, { useEffect, useState } from "react"
import useFetch from '../api/useFetch'
import Add from "./Workers/Add"
import Search from "./Workers/Search"
import Worker from "./Workers/Worker"


const Workers = () => {
  const [workerList, setWorkerList] = useState([])
  const [filteredWorkers, setFilteredWorkers] = useState([])
  const getSkills = useFetch('skills')

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
      <h2 className="title">Workers</h2>
      <Search workers={workerList} setWorkers={setFilteredWorkers} />
      <div className="panels">
        <div className="panel panel--table">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Skills</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((worker) => (
                <Worker key={worker.id} data={worker} getSkills={getSkills} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <Add setWorkerList={setWorkerList} setFilteredWorkers={setFilteredWorkers} />
        </div>
      </div>
    </>
  )
}

export default Workers
