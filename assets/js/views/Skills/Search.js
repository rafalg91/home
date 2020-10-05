import React from "react"

const Search = ({ skills, setSkills }) => {

  const searchSkills = (e) => {
    e.preventDefault()
    const filteredSkills = skills.filter((worker) => {
      return (
        worker.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )
    })

    setSkills(filteredSkills)
  }

  return (
    <div className="field search my-5">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Saerch worker..."
          onChange={searchSkills}
        />
      </div>
    </div>
  )
}

export default Search
