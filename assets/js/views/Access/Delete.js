import React, { useState } from 'react'
import classNames from "classnames/dedupe"

const Delete = ({id, refresh}) => {
  const [submitting, setSubmitting] = useState(false)

  const remove = async () => {
    setSubmitting(true)
    await fetch(`/api/access/${id}`, {
      method: "DELETE",
    })
    refresh()
  }

  return(
    <button className={classNames('button is-danger is-small', {'is-loading': submitting})} disabled={submitting} onClick={remove}>
      Delete
    </button>
  )
}

export default Delete