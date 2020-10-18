import React, { useState } from "react"
import classNames from "classnames/dedupe"
import { useFormik } from "formik"

const validate = (values) => {
  const errors = {}
  if (/^ *$/.test(values.name)) {
    errors.name = "Required"
  } else if (values.name.length < 2) {
    errors.name = "Must be at least 2 characters"
  }

  if (/^ *$/.test(values.surname)) {
    errors.surname = "Required"
  } else if (values.surname.length < 2) {
    errors.surname = "Must be at least 2 characters"
  }

  return errors
}

const Add = ({ setWorkerList, setFilteredWorkers }) => {
  const [modal, setModal] = useState(false)

  const addWorker = (data) => {
    return fetch("/api/workers/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setWorkerList(json)
        setFilteredWorkers(json)
      })
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      await addWorker(values)
      setModal(false)
      resetForm()
    },
  })

  return (
    <>
      <button className="button is-primary" onClick={() => setModal(true)}>
        Add worker
      </button>
      <div className={classNames("modal", { "is-active": modal })}>
        <div className="modal-background" onClick={() => setModal(false)}></div>
        <div className="modal-card">
          <form onSubmit={formik.handleSubmit}>
            <header className="modal-card-head">
              <p className="modal-card-title">Add Worker</p>
              <button
                className="delete"
                type="button"
                aria-label="close"
                onClick={() => setModal(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <div className="control">
                  <input
                    name="name"
                    className={classNames("input", {
                      "is-danger": formik.errors.name,
                    })}
                    placeholder="Name..."
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
                {formik.errors.name ? (
                    <p className="help is-danger">{formik.errors.name}</p>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="surname" className="label">
                  Surname
                </label>
                <div className="control">
                  <input
                    name="surname"
                    className={classNames("input", {
                      "is-danger": formik.errors.surname,
                    })}
                    placeholder="surname..."
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.surname}
                  />
                </div>
                {formik.errors.surname ? (
                    <p className="help is-danger">{formik.errors.surname}</p>
                ) : null}
              </div>
            </section>
            <footer className="modal-card-foot">
              <button type="submit" className="button is-success">
                Add worker
              </button>
              <button
                className="button"
                type="button"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}

export default Add