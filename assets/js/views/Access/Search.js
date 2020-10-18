import React from "react"

const Search = ({ access, setAccess }) => {

  const searchAccess = (e) => {
    e.preventDefault()
    const filteredAccess = access.filter((item) => {
      return (
        item.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )
    })

    setAccess(filteredAccess)
  }

  return (
    <div className="field search my-5">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Saerch worker..."
          onChange={searchAccess}
        />
      </div>
    </div>
  )
}

export default Search
