import React, {useState} from 'react'
import classNames from "classnames/dedupe"
import { useFormik } from 'formik';

const Add = ({ setWorkerList, setFilteredWorkers }) => {
  const [modal, setModal] = useState(false)

  const addWorker = (data) => {
    return fetch("/api/workers/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(json => {
      setWorkerList(json)
      setFilteredWorkers(json)
    })
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
    },
    onSubmit: async (values, { resetForm }) => {
      await addWorker(values)
      setModal(false)
      resetForm()
    }
  })

  return (
    <>
      <button className="button is-primary" onClick={() => setModal(true)}>
        Add worker
      </button>
      <div className={classNames('modal', {'is-active': modal})}>
        <div className="modal-background" onClick={() => setModal(false)}></div>
        <div className="modal-card">
          <form onSubmit={formik.handleSubmit}>
            <header className="modal-card-head">
              <p className="modal-card-title">Add Worker</p>
              <button className="delete" type="button" aria-label="close" onClick={() => setModal(false)}></button>
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
              <button type="submit" className="button is-success">Add worker</button>
              <button className="button" type="button" onClick={() => setModal(false)}>Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}

export default Add

// import React from "react"
// import { useFormik } from 'formik';
// import classNames from "classnames/dedupe"

// const Add = ({ setWorkerList }) => {
//   const addWorker = (data) => {
//     fetch("/api/workers/add", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: { "Content-Type": "application/json" },
//     })
//     .then((res) => res.json())
//     .then((json) => {
//       setWorkerList(json)
//     })
//   }

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       surname: '',
//     },
//     onSubmit: (values, { resetForm }) => {
//       addWorker(values)
//       resetForm()
//     }
//   })

//   return (
//     <>
//       <h2 className="title is-5">Add worker</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <div className="field">
//           <label htmlFor="name" className="label">Name</label>
//           <div className="control">
//             <input
//               name="name"
//               className="input"
//               placeholder="Name..."
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.name}
//             />
//           </div>
//         </div>
//         <div className="field">
//         <label htmlFor="surname" className="label">Surname</label>
//           <div className="control">
//             <input
//               name="surname"
//               className="input"
//               placeholder="surname..."
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.surname}
//             />
//           </div>
//         </div>
//         <div className="field">
//           <div className="control mt-5">
//             <button type="submit" className={classNames('button is-primary', {'is-loading': formik.isSubmitting})} disabled={formik.isSubmitting}>
//               Add worker
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   )
// }

// export default Add
