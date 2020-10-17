import React from "react"
import moment from "moment"
import useFetch from "../api/useFetch"

const Logs = () => {
  const logs = useFetch('logs')

  return (
    <>
      <h2 className="title">Logs</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Worker</th>
            <th>Access</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs
            .sort(
              (a, b) =>
                moment(b.date).format("YYYYMMDD") -
                moment(a.date).format("YYYYMMDD")
            )
            .map((log) => (
              <tr key={log.id}>
                <td>{log.date}</td>
                <td>{log.worker.name}</td>
                <td>{log.access.name}</td>
                <td>
                  {log.status ? (
                    <span className="tag is-success is-light">added</span>
                  ) : (
                    <span className="tag is-danger is-light">removed</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default Logs
