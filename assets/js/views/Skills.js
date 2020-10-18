import React from "react"
import Add from "./Skills/Add"
import Search from "./Skills/Search"
import Edit from "./Skills/Edit"
import Delete from "./Skills/Delete"
import useFetch from "../api/useFetch"

const Skills = () => {
  const [skills, refresh, filteredSkills, setFilteredSkills] = useFetch("skills")

  return (
    <>
      <h2 className="title">Skills</h2>
      <Search skills={skills} setSkills={setFilteredSkills} />
      <div className="columns">
        <div className="column is-8">
          <div className="panel panel--table">
          <table className="table">
            <thead>
              <tr>
                <th>iID</th>
                <th>Name</th>
                <th className="col-buttons-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.id}</td>
                  <td>{skill.name}</td>
                  <td>
                    <div className="buttons">
                      <Edit id={skill.id} name={skill.name} refresh={refresh} />
                      <Delete id={skill.id} refresh={refresh} />
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
            <Add refresh={refresh} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Skills
