import React from "react"
import { useFormik } from 'formik';
import classNames from "classnames/dedupe"

const validate = values => {
  const errors = {};
  if (/^ *$/.test(values.name)) {
    errors.name = 'Required';
  } else if (values.name.length < 2) {
    errors.name = 'Must be at least 2 characters';
  }

  return errors;
};

const Add = ({ setSkillList }) => {
  const addSkill = (data) => {
    fetch("/api/skills/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.json())
    .then((json) => {
      setSkillList(json)
    })
  }

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate,
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
              className={classNames('input', {'is-danger': formik.errors.name})}
              placeholder="Name..."
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
          {formik.errors.name ? <p className="help is-danger">{formik.errors.name}</p> : null}
        </div>
        <div className="field">
          <div className="control mt-5">
            <button type="submit" className={classNames('button is-primary', {'is-loading': formik.isSubmitting})} disabled={formik.isSubmitting}>
              Add skill
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Add
