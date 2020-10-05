import React from "react"
import { useFormik } from 'formik';

const Add = ({ setSkillList, setFilteredSkills }) => {
  const addSkill = (data) => {
    fetch("/api/skills/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then((json) => {
      setSkillList(json)
      setFilteredSkills(json)
    })
  }

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values, { resetForm }) => {
      addSkill(values)
      resetForm()
    }
  })

  return (
    <>
      <h2 className="title is-5">Add skill</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label htmlFor="name" className="label">Name</label>
          <div className="control">
            <input
              name="name"
              className="input"
              placeholder="Name..."
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
        </div>
        <div className="field">
          <div className="control mt-5">
            <button type="submit" className="button is-primary">
              Add skill
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Add
