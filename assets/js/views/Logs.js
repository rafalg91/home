import React from "react"
import useFetch from "../api/useFetch"
import Search from "./Logs/Search"

const Logs = () => {
  const [logs, refresh, filteredLogs, setFilteredLogs] = useFetch("logs")

  return (
    <>
      <h2 className="title">Logs</h2>
      <Search logs={logs} setLogs={setFilteredLogs} />
      <div className="panel panel--table">
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
            {filteredLogs
              .sort((a, b) => b.id - a.id)
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
      </div>
    </>
  )
}

export default Logs
