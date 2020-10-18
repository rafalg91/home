import React from "react"

const Search = ({ logs, setLogs }) => {

  const searchLogs = (e) => {
    e.preventDefault()
    const filteredLogs = logs.filter((item) => {
      return (
        item.worker.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()) ||
        item.access.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )
    })

    setLogs(filteredLogs)
  }

  return (
    <div className="field search my-5">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Saerch worker or access..."
          onChange={searchLogs}
        />
      </div>
    </div>
  )
}

export default Search
