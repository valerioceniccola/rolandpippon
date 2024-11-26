import { Center, Container, Loader, Table } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllPlayers } from "../../api/api.ts"
import { Helmet } from "react-helmet"

export function Ranking() {

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [players, setPlayers] = useState<any>(null)

  useEffect(() => {
    setIsLoading(true)

    getAllPlayers()
      .then((data) => {
        data.sort((a: any, b: any) => b.data.ranking - a.data.ranking)
        setPlayers(data)
      })
      .finally(() => {
        setIsLoading(false)
      })

    setIsLoading(false)
  }, [])

  return (
    <>
      <Helmet>
        <title>Ranking</title>
      </Helmet>
      {
        (!isLoading && players) ?
          <Container size="sm">

            <Table stickyHeader stickyHeaderOffset={60} verticalSpacing="lg">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Nome</Table.Th>
                  <Table.Th>Ranking</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {
                  players.map((player: any) => {
                    return (
                      <Table.Tr key={player.id}>
                        <Table.Td>{player.data.name}</Table.Td>
                        <Table.Td>{player.data.ranking}</Table.Td>
                      </Table.Tr>
                    )
                  })
                }
              </Table.Tbody>
            </Table>

          </Container>
          :
          <Center>
            <Loader size="sm" color="gray"/>
          </Center>
      }
    </>
  )

}
