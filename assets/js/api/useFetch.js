import { useEffect, useState } from "react"

const useFetch = (path) => {
  const [data, setData] = useState([])
  const [change, setChange] = useState(false)

  useEffect(() => {
    fetch("/api/" + path)
      .then((res) => res.json())
      .then((json) => setData(json))
  }, [change])

  return [
    data,
    () => setChange(!change)
  ]
}

export default useFetch
