import React, { useState } from "react"
import Edit from "./Edit"
import Delete from "./Delete"
import Skills from "./Skills"
import AddSkill from "./AddSkill"

const Worker = ({ data }) => {
  const [worker, setWorker] = useState(data)

  return (
    <>
      {worker && (
        <tr>
          <td>{worker.id}</td>
          <td>{worker.name}</td>
          <td>{worker.surname}</td>
          <td>
            <Skills skills={worker.skills} worker={worker.id} setWorker={setWorker}/>
          </td>
          <td>
            <div className="buttons">
              <Edit id={worker.id} name={worker.name} surname={worker.surname} setWorker={setWorker}/>
              <Delete id={worker.id} setWorker={setWorker} />
              <AddSkill worker={worker.id} setWorker={setWorker} />
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default Worker
