import { Anchor, Avatar, Center, Container, Group, Loader, Table, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { getAllPlayers } from "../../api/api.ts"
import { Helmet } from "react-helmet"
import { NavLink } from "react-router-dom"

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

            <Table stickyHeader verticalSpacing="lg">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th w={50}>Pos</Table.Th>
                  <Table.Th>Nome</Table.Th>
                  <Table.Th>Punti</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {
                  players.map((player: any, index: number) => {
                    return (
                      <Table.Tr key={player.id}>
                        <Table.Td fw="bold">{index + 1}</Table.Td>
                        <Table.Td>
                          <Group>
                            <Avatar src={player.data.img} alt={player.data.name} />
                            <Anchor component={NavLink} to={`/players/${player.id}`}>
                              <Text fw="bold">{player.data.name}</Text>
                            </Anchor>
                          </Group>
                        </Table.Td>
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
