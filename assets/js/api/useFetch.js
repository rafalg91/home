import { useEffect, useState } from 'react'

const useFetch = (path) => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/api/' + path)
      .then(res => res.json())
      .then(json => setData(json))
  },[])

  return data
}

export default useFetch