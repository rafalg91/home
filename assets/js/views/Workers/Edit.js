import React, {useState} from 'react'
import classNames from "classnames/dedupe"
import { useFormik } from 'formik';

const Edit = ({ setWorker, name, surname, id }) => {
  const [modal, setModal] = useState(false)

  const editWorker = (data) => {
    fetch(`/api/workers/${id}/edit`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(json => {
      setWorker(json)
    })
  }

  const formik = useFormik({
    initialValues: {
      name: name,
      surname: surname,
    },
    onSubmit: (values) => {
      editWorker(values)
      setModal(false)
    }
  })

  return (
    <>
      <button className="button is-info is-small" onClick={() => setModal(true)}>
        Edit
      </button>
      <div className={classNames('modal', {'is-active': modal})}>
        <div className="modal-background" onClick={() => setModal(false)}></div>
        <div className="modal-card">
          <form onSubmit={formik.handleSubmit}>
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Worker</p>
              <button type="button" className="delete" aria-label="close" onClick={() => setModal(false)}></button>
            </header>
            <section className="modal-card-body">
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
            </section>
            <footer className="modal-card-foot">
              <button type="submit" className="button is-success">Save changes</button>
              <button type="button" className="button" onClick={() => setModal(false)}>Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}

export default Edit