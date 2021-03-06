import React, { useState } from "react"
import classNames from "classnames/dedupe"

const AddSkill = ({ getSkills, worker, setWorker }) => {
  const [dropdown, setDropdown] = useState(false)

  const add = (e, skill) => {
    e.preventDefault()
    setDropdown(false)

    const data = {
      skill: skill,
      worker: worker
    }

    fetch(`/api/workers/add_skill`, {
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
    <>
      {getSkills.length ? (
        <div className={classNames("dropdown", { "is-active": dropdown })}>
          <div className="dropdown-trigger">
            <button
              className="button is-link is-small"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={activeDropdown}
            >
              <span>Add skill</span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {getSkills.map((skill) => (
                <a href="#" className="dropdown-item" key={skill.id} onClick={(e) => add(e, skill.id)}>
                  {skill.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default AddSkill
