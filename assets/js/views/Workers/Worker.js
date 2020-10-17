import React, { useState } from "react"
import Edit from "./Edit"
import Delete from "./Delete"
import Skills from "./Skills"
import Access from "./Access"
import AddSkill from "./AddSkill"

const Worker = ({ data, getSkills, getAccess }) => {
  const [worker, setWorker] = useState(data)

  return (
    <>
      {worker && (
        <tr>
          <td>{worker.id}</td>
          <td>{worker.name}</td>
          <td>{worker.surname}</td>
          <td>
            <Skills getSkills={getSkills} skills={worker.skills} worker={worker.id} setWorker={setWorker}/>
          </td>
          <td>
            <Access access={worker.access} worker={worker.id} setWorker={setWorker} />
          </td>
          <td>
            <div className="buttons">
              <Edit id={worker.id} name={worker.name} surname={worker.surname} setWorker={setWorker}/>
              <Delete id={worker.id} setWorker={setWorker} />
              <AddSkill worker={worker.id} setWorker={setWorker} getSkills={getSkills} />
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default Worker
