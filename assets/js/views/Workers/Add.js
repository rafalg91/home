import React, {useRef} from "react"
import { useFormik } from 'formik';

const Add = ({ setWorkerList, setFilteredWorkers }) => {
  const addWorker = (data) => {
    fetch("/api/workers/add", {
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
      name: '',
      surname: '',
    },
    onSubmit: (values, { resetForm }) => {
      addWorker(values)
      resetForm()
    }
  })

  return (
    <>
      <h2 className="title is-5">Add worker</h2>
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
        <label htmlFor="surname" className="label">Surname</label>
          <div className="control">
            <input
              name="surname"
              className="input"
              placeholder="surname..."
              type="text"
              onChange={formik.handleChange}
              value={formik.values.surname}
            />
          </div>
        </div>
        <div className="field">
          <div className="control mt-5">
            <button type="submit" className="button is-primary">
              Add worker
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Add
