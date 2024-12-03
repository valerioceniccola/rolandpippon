import {
  Avatar,
  Blockquote,
  Box, Button,
  Center,
  Container, Divider, Grid,
  Group,
  Loader, Paper, SimpleGrid, Skeleton,
  Tabs,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllPlayers, getPlayer, getTournament } from "../../api/api.ts"
import { Helmet } from "react-helmet"


export function Players() {

  const params = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [players, setPlayers] = useState<any>(null)

  useEffect(() => {
    setIsLoading(true)

    getAllPlayers()
      .then((data) => {
        setPlayers(data)
      })
      .finally(() => {
        setIsLoading(false)
      })

  }, [])

  return (
    <>
      <Helmet>
        <title>Tennisti</title>
      </Helmet>
      {
        (!isLoading && players) ?
          <Container size="md">

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              {
                players.map((player: any) => (
                  <Paper
                    key={player.data.name}
                    withBorder
                    p="lg"
                    onClick={() => navigate(`/players/${player.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Avatar
                      src={`/players/${player.id}.jpg`}
                      size={120}
                      radius={120}
                      mx="auto"
                      alt={player.data.name}
                    />
                    <Title order={5} tt="uppercase" ta="center" fz="lg" fw={500} mt="md">
                      {player.data.name}
                    </Title>
                    <Text ta="center" c="dimmed" fz="xs">
                      {player.data.racket}
                    </Text>

                    <Button
                      fullWidth
                      mt="md"
                      onClick={() => navigate(`/players/${player.id}`)}
                    >
                      Vedi dettagli
                    </Button>
                  </Paper>
                ))
              }
            </SimpleGrid>

          </Container>
          :
          <>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              {
                [...Array(9)].map((item: number, ic: number) => (
                  <Skeleton key={ic} height={280} style={{ aspectRatio: 1 }}/>
                ))
              }
            </SimpleGrid>
          </>
      }
    </>
  )

}
