import {
  Avatar,
  Blockquote,
  Box, Button,
  Center,
  Container, Divider,
  Group,
  Loader, Paper, SimpleGrid,
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
        console.log(data)
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
          <Container size="sm">

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              {
                players.map((player: any) => (
                  <Paper key={player.data.name} withBorder p="lg" bg="var(--mantine-color-dark-8)">
                    <Avatar
                      src={player.data.img}
                      size={120}
                      radius={120}
                      mx="auto"
                      alt={player.data.name}
                    />
                    <Text ta="center" fz="lg" fw={500} mt="md">
                      {player.data.name}
                    </Text>
                    <Text ta="center" c="dimmed" fz="sm">
                      {player.data.racket}
                    </Text>

                    <Button
                      variant="default"
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
          <Center>
            <Loader size="sm" color="gray"/>
          </Center>
      }
    </>
  )

}
