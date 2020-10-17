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

const Add = ({refresh}) => {
  const addAccess = (data) => {
    return fetch("/api/access/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
  }

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      await addAccess(values)
      resetForm()
      refresh()
    }
  })

  return (
    <>
      <h2 className="title is-5">Add Access</h2>
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
              Add Access
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Add
