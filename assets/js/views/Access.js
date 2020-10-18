import React from "react"
import useFetch from "../api/useFetch"
import Add from "./Access/Add"
import Delete from "./Access/Delete"
import Edit from "./Access/Edit"

const Access = () => {
  const [access, refresh] = useFetch("access")

  return (
    <>
      <h2 className="title">Access</h2>
      <div className="columns">
        <div className="column is-8">
          <div className="panel panel--table">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    #
                  </th>
                  <th>
                    Name
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {access.map(item => (
                  <tr key={item.id}>
                    <td>
                      {item.id}
                    </td>
                    <td>
                      {item.name}
                    </td>
                    <td>
                      <div className="buttons">
                        <Edit id={item.id} name={item.name} refresh={refresh} />
                        <Delete id={item.id} refresh={refresh} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="column is-auto">
          <div className="panel">
            <Add refresh={refresh} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Access
