import { Text, useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"

export function Dashboard() {

  const theme = useMantineTheme()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    setIsLoading(false)
  }, [])

  return (
    <>
      <Text>Ciao</Text>
    </>
  )

}
