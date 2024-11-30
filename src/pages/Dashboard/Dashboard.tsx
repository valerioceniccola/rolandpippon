import { Box, Center, Loader, SimpleGrid, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllTournaments } from "../../api/api.ts"
import { CardTournament } from "../../components/molecules/CardTournament/CardTournament.tsx"
import { Helmet } from "react-helmet"

export function Dashboard() {

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tournaments, setTournaments] = useState<any>(null)

  useEffect(() => {
    setIsLoading(true)

    getAllTournaments()
      .then((data) => {

        const dataFiltered =
          data
            .sort((a: any, b: any) => b.data.dateStart.seconds - a.data.dateStart.seconds)
            .filter((item: any) => item.data.dateStart.seconds < Date.now() / 1000)

        setTournaments(dataFiltered)
      }).finally(() => {
      setIsLoading(false)
    })

    setIsLoading(false)
  }, [])

  return (
    <>
      <Helmet>
        <title>Tutti i tornei</title>
      </Helmet>
      <Box mb="xl">
        <Title order={2} mb="md" tt="uppercase">Tutti i tornei</Title>
        <Text>La lista di tutti i tornei giocati e in corso del Pippon Tour in ordine cronologico</Text>
      </Box>
      {
        (!isLoading && tournaments) ?
          <SimpleGrid cols={{ base: 1 }}>
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
