import React, { useState } from "react"

const Skills = ({ skills, worker }) => {
  const[currentSkills, setCurrentSkills] = useState(skills)

  const remove = (skill) => {
    fetch(`/api/workers/${worker}/skills/${skill}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((json) => {
      setCurrentSkills(json)
    })
  }

  return (
    <div className="tags">
      {currentSkills.map((skill) => {
        return (
          <span className="tag is-link" key={skill.id}>
            {skill.name}
            <button
              className="delete is-small"
              onClick={() => remove(skill.id)}
            ></button>
          </span>
        )
      })}
    </div>
  )
}

export default Skills
