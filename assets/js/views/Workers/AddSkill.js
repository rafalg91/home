import React, { useState, useEffect } from "react"
import classNames from "classnames/dedupe"

const AddSkill = ({ worker, changeSkills }) => {
  const [skills, setSkills] = useState([])
  const [dropdown, setDropdown] = useState(false)

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((json) => {
        setSkills(json)
      })
  }, [])

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
    .then((res) => res.json())
    .then((json) => {
      changeSkills(json)
    })
  }

  return (
    <div className={classNames("dropdown", { "is-active": dropdown })}>
      <div className="dropdown-trigger">
        <button
          className="button is-success is-small"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdown(!dropdown)}
        >
          <span>Add skill</span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {skills.map((skill) => (
            <a href="#" className="dropdown-item" key={skill.id} onClick={(e) => add(e, skill.id)}>
              {skill.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddSkill
