import React, { useState } from "react"
import classNames from "classnames/dedupe"

const AddSkill = ({ getAccess, worker, setWorker }) => {
  const [dropdown, setDropdown] = useState(false)

  const add = (e, access) => {
    e.preventDefault()
    setDropdown(false)

    const data = {
      access: access,
      worker: worker
    }

    fetch(`/api/workers/add_access`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(json => {
      setWorker(json)
    })
  }

  const activeDropdown = () => {
    const elements = document.querySelectorAll('.dropdown.is-active')
    elements.forEach(item => {
      item.classList.remove('is-active')
    })

    setDropdown(!dropdown)
  }

  return (
    <div className={classNames("dropdown ml-2", { "is-active": dropdown })}>
      <div className="dropdown-trigger">
        <button
          className="button is-success is-small"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={activeDropdown}
        >
          <span>Add access</span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {getAccess.map((item) => (
            <a href="#" className="dropdown-item" key={item.id} onClick={(e) => add(e, item.id)}>
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddSkill
