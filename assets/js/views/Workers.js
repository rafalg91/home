import React, { useEffect, useState } from "react"
import useFetch from '../api/useFetch'
import Add from "./Workers/Add"
import Search from "./Workers/Search"
import Worker from "./Workers/Worker"


const Workers = () => {
  const [workerList, setWorkerList] = useState([])
  const [filteredWorkers, setFilteredWorkers] = useState([])
  const [getSkills] = useFetch('skills')
  const [getAccess] = useFetch('access')

  useEffect(() => {
    fetch("/api/workers")
    .then((res) => res.json())
    .then((json) => {
      setWorkerList(json)
    })
  }, [])

  useEffect(() => {
    setFilteredWorkers(workerList)
  }, [workerList])

  return (
    <>
      <h2 className="title">Workers</h2>
      <Search workers={workerList} setWorkers={setFilteredWorkers} />
      <div className="panelss">
        <div className="panel panel--table">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Skills</th>
                <th>Access</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((worker) => (
                <Worker key={worker.id} data={worker} getSkills={getSkills} getAccess={getAccess} />
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="panel">
          <Add setWorkerList={setWorkerList} />
        </div> */}
      </div>
    </>
  )
}

export default Workers
