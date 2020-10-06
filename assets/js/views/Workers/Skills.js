import React from "react"

const Skills = ({skills}) => {

  return (
    <>
      {skills.map(skill => {
        return skill.name + ' '
      })}
    </>
  )
}

export default Skills
