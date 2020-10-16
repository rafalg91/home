import React, { useState, useEffect } from "react"
import moment from "moment"

const Logs = () => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetch("/api/logs")
      .then((res) => res.json())
      .then((json) => setLogs(json))
  }, [])

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
                    <span class="tag is-success is-light">added</span>
                  ) : (
                    <span class="tag is-danger is-light">removed</span>
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
