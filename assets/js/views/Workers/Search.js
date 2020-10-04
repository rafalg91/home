import React from "react"

const Search = ({ workers, setWorkers }) => {

  const searchWorkers = (e) => {
    e.preventDefault()
    const filteredWorkers = workers.filter((worker) => {
      return (
        worker.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()) ||
        worker.surname.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )
    })

    setWorkers(filteredWorkers)
  }

  return (
    <div className="field search my-5">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Saerch worker..."
          onChange={searchWorkers}
        />
      </div>
    </div>
  )
}

export default Search
