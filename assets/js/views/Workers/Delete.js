import React from 'react'

const Delete = ({ id, setWorker }) => {
  const deleteWorker = () => {
    fetch(`/api/workers/${id}`, {
      method: "DELETE",
    })
    setWorker(null)
  }
  return (
    <button className="button is-danger is-small" onClick={deleteWorker}>
      Delete
    </button>
  )
}

export default Delete

// import React from 'react'

// const Delete = ({ setWorkerList, setFilteredWorkers, id }) => {
//   const deleteWorker = () => {
//     fetch(`/api/workers/${id}`, {
//       method: "DELETE",
//     })
//     .then((res) => res.json())
//     .then((json) => {
//       setWorkerList(json)
//       setFilteredWorkers(json)
//     })
//   }
//   return (
//     <button className="button is-danger is-small" onClick={deleteWorker}>
//       Delete
//     </button>
//   )
// }

// export default Delete