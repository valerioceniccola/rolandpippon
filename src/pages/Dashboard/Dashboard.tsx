import { Box, Center, Loader, SimpleGrid, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllTournaments } from "../../api/api.ts"
import { CardTournament } from "../../components/molecules/CardTournament/CardTournament.tsx"

export function Dashboard() {

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tournaments, setTournaments] = useState<any>(null)

  useEffect(() => {
    setIsLoading(true)

    getAllTournaments()
      .then((data) => {
        data.sort((a: any, b: any) => b.data.dateStart.seconds - a.data.dateStart.seconds)
        setTournaments(data)
      }).finally(() => {
      setIsLoading(false)
    })

    setIsLoading(false)
  }, [])

  return (
    <>
      <Title order={2} mb="xl" tt="uppercase">Tutti i tornei</Title>
      {
        (!isLoading && tournaments) ?
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {
              tournaments.map((tournament: any) => (
                <CardTournament
                  live={tournament.data.live}
                  key={tournament.id}
                  id={tournament.id}
                  name={tournament.data.name}
                  date={tournament.data.date}
                  description={tournament.data.description}
                />
              ))
            }
          </SimpleGrid>
          :
          <Center>
            <Loader size="sm" color="gray"/>
          </Center>
      }
    </>
  )

}
