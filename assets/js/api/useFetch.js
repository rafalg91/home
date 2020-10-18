import { useEffect, useState } from "react"

const useFetch = (path) => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [change, setChange] = useState(false)

  useEffect(() => {
    fetch("/api/" + path)
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        setFilteredData(json)
      })
  }, [change])

  return [
    data,
    () => setChange(!change),
    filteredData,
    setFilteredData
  ]
}

export default useFetch
