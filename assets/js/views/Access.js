import React from "react"
import useFetch from "../api/useFetch"
import Add from "./Access/Add"

const Access = () => {
  const access = useFetch("access")

  return (
    <>
      <h2 className="title">Access</h2>
      <div className="panels">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <Add />
        </div>
      </div>
    </>
  )
}

export default Access
