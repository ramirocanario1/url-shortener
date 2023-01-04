import { useEffect, useState } from "react";

const BASE_URL = 'https://api.shrtco.de/v2/shorten?url=' // + url

export default function useFetch({longUrl}) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [error, setError] = useState(false)

  useEffect(() => {
    if (longUrl.length > 0) {
      setData('')
      setIsLoading(true)
      fetch(BASE_URL + longUrl)
      .then(r => r.json())
      .then(r => {
        setData(r)
        setIsLoading(false)
        setError(!r.ok)
        console.log({r})
        console.log({error})
      })
    }

  }, [longUrl])
  
  return [isLoading, data, error]
}