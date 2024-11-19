import { useEffect, useState } from "react";


export function Blank() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

  }, [])

  return (
    <>
      Empty
    </>
  )

}
