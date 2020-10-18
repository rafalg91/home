import React, { useState, useEffect } from "react"
import useFetch from "../api/useFetch"
import Add from "./Access/Add"
import Delete from "./Access/Delete"
import Edit from "./Access/Edit"
import Search from "./Access/Search"

const Access = () => {
  const [access, refresh, filteredAccess, setFilteredAccess] = useFetch("access")

  return (
    <>
      <h2 className="title">Access</h2>
      <Search access={access} setAccess={setFilteredAccess} />
      <div className="columns">
        <div className="column is-8">
          <div className="panel panel--table">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    ID
                  </th>
                  <th>
                    Name
                  </th>
                  <th className="col-buttons-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAccess.map(item => (
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
