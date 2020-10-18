import React, {useState} from 'react'
import classNames from "classnames/dedupe"
import { useFormik } from 'formik';

const Edit = ({ name, id, refresh }) => {
  const [modal, setModal] = useState(false)

  const editSkill = (data) => {
    return fetch(`/api/access/${id}/edit`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
  }

  const formik = useFormik({
    initialValues: {
      name: name,
    },
    onSubmit: async (values) => {
      await editSkill(values)
      refresh()
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
              <p className="modal-card-title">Edit Skill</p>
              <button className="delete" aria-label="close" onClick={() => setModal(false)}></button>
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
            </section>
            <footer className="modal-card-foot">
              <button type="submit" className={classNames("button is-success", {"is-loading": formik.isSubmitting,})}>
                Save changes
              </button>
              <button className="button" onClick={() => setModal(false)}>Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}

export default Edit