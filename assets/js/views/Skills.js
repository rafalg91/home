import React, { useEffect, useState } from "react"
import Add from "./Skills/Add"
import Search from "./Skills/Search"
import Edit from "./Skills/Edit"

const Skills = () => {
  const [skillList, setSkillList] = useState([])
  const [filteredSkills, setFilteredSkills] = useState([])

  useEffect(() => {
    fetch("/api/skills")
    .then((res) => res.json())
    .then((json) => {
      setSkillList(json)
      setFilteredSkills(json)
    })
  }, [])

  const deleteSkill = (id) => {
    fetch(`/api/skills/${id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((json) => {
      setSkillList(json)
      setFilteredSkills(json)
    })
  }

  return (
    <>
      <div className="columns">
        <div className="column is-half">
          <h2 className="title is-5">Skills</h2>
          <Search skills={skillList} setSkills={setFilteredSkills} />
          <table className="table is-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.id}</td>
                  <td>{skill.name}</td>
                  <td>
                    <div className="buttons">
                      <button
                        className="button is-danger is-small"
                        onClick={() => deleteSkill(skill.id)}
                      >
                        Delete
                      </button>
                      <Edit
                        setSkillList={setSkillList}
                        setFilteredSkills={setFilteredSkills}
                        id={skill.id}
                        name={skill.name}
                        surname={skill.surname}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column is-one-third">
          <Add setSkillList={setSkillList} setFilteredSkills={setFilteredSkills} />
        </div>
      </div>
    </>
  )
}

export default Skills
