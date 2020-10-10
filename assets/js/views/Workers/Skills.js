import React from "react"

const Skills = ({ skills, worker, setWorker }) => {
  const remove = (id) => {
    fetch(`/api/workers/${worker}/skills/${id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((json) => {
      setWorker(json)
    })
  }

  return (
    <>
      {skills && (
        <div className="tags">
          {skills.map((skill) => (
            <span key={skill.id} className="tag is-link">
              {skill.name}
              <button
                className="delete is-small"
                onClick={() => remove(skill.id)}
              ></button>
            </span>
          ))}
        </div>
      )}
    </>
  )
}

export default Skills
