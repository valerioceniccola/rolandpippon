import { Avatar, Center, Container, Divider, Group, Loader, Paper, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPlayer } from "../../api/api.ts"
import { Helmet } from "react-helmet"


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
          <>
            <Helmet>
              <title>{player.name}</title>
            </Helmet>
            <Container size="sm">

              <div style={{ textAlign: 'center' }}>
                <Avatar
                  src={player.img}
                  alt={player.name}
                  mb="sm"
                  style={{ display: 'inline-block', border: '3px solid #fff' }}
                  h={160}
                  w={160}
                />
                <Title order={1} tt="uppercase" mb="lg">{player.name}</Title>
                <Divider mb="lg"/>
                <Group justify="center" gap="xl">
                  <div>
                    <Text tt="uppercase" size="xs">Racchetta</Text>
                    <Title order={3} mb="md">{player.racket}</Title>
                  </div>
                  <div>
                    <Text tt="uppercase" size="xs">P.ti ranking</Text>
                    <Title order={3} mb="md">{player.ranking}</Title>
                  </div>
                </Group>
                <Paper radius="lg" withBorder p="xl" bg="var(--mantine-color-gray-1)">
                  {player.description}
                </Paper>
              </div>

            </Container>
          </>
          :
          <Center>
            <Loader size="sm" color="gray"/>
          </Center>
      }
    </>
  )

}
