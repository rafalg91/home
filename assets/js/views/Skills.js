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
    })
  }, [])

  useEffect(() => {
    setFilteredSkills(skillList)
  }, [skillList])

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
      <h2 className="title">Skills</h2>
      <Search skills={skillList} setSkills={setFilteredSkills} />
      <div className="columns">
        <div className="column is-8">
          <div className="panel panel--table">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
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
        </div>
        <div className="column is-auto">
          <div className="panel">
            <Add setSkillList={setSkillList} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Skills
