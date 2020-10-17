import React from 'react'

const Access = ({access, worker, setWorker}) => {
  const remove = (id) => {
    fetch(`/api/workers/${worker}/access/${id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((json) => {
      setWorker(json)
    })
  }

  return (
    <div className="tags">
      {access.map((item) => (
        <span className="tag is-success" key={item.id}>
          {item.name}
          <button className="delete is-small" onClick={() => remove(item.id)}></button>
        </span>
      ))}
    </div>
  )
}

export default Access