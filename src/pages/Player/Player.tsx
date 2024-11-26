import {
  Avatar,
  Blockquote,
  Box,
  Center,
  Container, Divider,
  Group,
  Loader, Paper,
  Tabs,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPlayer, getTournament } from "../../api/api.ts"


export function Player() {

  const params = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [player, setPlayer] = useState<any>(null)

  useEffect(() => {
    setIsLoading(true)

    if (!params.slug) return

    getPlayer(params.slug)
      .then((data) => {
        if (data !== undefined) {
          setPlayer(data)
        } else {
          navigate("/404")
        }
      })
      .finally(() => {
        setIsLoading(false)
      })

  }, [params.slug])

  return (
    <>
      {
        (!isLoading && player) ?
          <Container size="sm">

            <div style={{ textAlign: 'center' }}>
              <Avatar
                src={player.img}
                alt={player.name}
                size="xl"
                mb="sm"
                style={{ display: 'inline-block', border: '3px solid #fff' }}
              />
              <Title order={1} mb="lg">{player.name}</Title>
              <div>
                <Text tt="uppercase" size="xs">Racchetta</Text>
                <Title order={3} mb="md">{player.racket}</Title>
              </div>
              <Paper shadow="xs" radius="lg" withBorder p="xl" bg="var(--mantine-color-dark-8)">
                {player.description}
              </Paper>
            </div>

          </Container>
          :
          <Center>
            <Loader size="sm" color="gray"/>
          </Center>
      }
    </>
  )

}
