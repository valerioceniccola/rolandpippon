import { Box, Title } from "@mantine/core"
import { useEffect, useState } from "react"

export function Dashboard() {

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    setIsLoading(false)
  }, [])

  return (
    <>
      <Title order={1} mb="xl">Lista dei tornei</Title>
    </>
  )

}
