import { Anchor, Avatar, Badge, Box, Center, Group, Loader, Paper, SimpleGrid, Tabs, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { getPlayer, getTournament } from "../../api/api.ts"
import { Helmet } from "react-helmet"
import classes from "./Tournament.module.css"


export function Tournament() {

  const params = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tournament, setTournament] = useState<any>(null)
  const [winner, setWinner] = useState<any>(null)
  const [winner2, setWinner2] = useState<any>(null)
  const [winner3, setWinner3] = useState<any>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://picflow.com/embed/main.js"
    script.defer = true
    script.type = 'module'
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    setIsLoading(true)

    if (!params.id) return

    getTournament(params.id)
      .then((data) => {
        if (data !== undefined) {
          setTournament(data)

          getPlayer(data.winner)
            .then((player) => {
              setWinner({
                data: player,
                id: data.winner
              })
            })

          getPlayer(data.winner2)
            .then((player) => {
              setWinner2({
                data: player,
                id: data.winner2
              })
            })

          getPlayer(data.winner3)
            .then((player) => {
              setWinner3({
                data: player,
                id: data.winner3
              })
            })

          setIsLoading(false)

        } else {
          navigate("/404")
        }
      })

  }, [params.id])

  return (
    <>
      <Helmet>
        <title>Tornei</title>
      </Helmet>
      {
        (!isLoading && tournament && winner && winner2 && winner3) ?
          <Box mb="lg">

            {
              tournament.live ?
                <Badge size="lg" mb="lg" color="red">Live</Badge>
                :
                <Badge size="lg" mb="lg">{tournament.date}</Badge>
            }

            <Title tt="uppercase" order={1} mb="xl">{tournament.name}</Title>

            <Tabs color="green" defaultValue="info">

              <Tabs.List mb="lg">
                <Tabs.Tab value="info">Informazioni</Tabs.Tab>
                <Tabs.Tab value="results">Risultati</Tabs.Tab>
                <Tabs.Tab value="rules">Regolamento</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="info">

                <Box mb="lg" py="md">
                  <Paper p="lg" className={classes.winners}>
                    <SimpleGrid cols={3}>
                      {
                        // Ciclo 3 elementi
                        [winner, winner2, winner3].map((player: any, index: number) => (
                          <div key={index}>
                            <Title order={5} tt="uppercase" mb="sm">
                              <Group justify="flex-start">
                                <div>🏆</div> {index + 1}° Posto
                              </Group>
                            </Title>
                            <Group gap="md">
                              <Avatar src={player.data.img} alt={player.data.name} style={{ border: '2px solid #fff' }}/>
                              <Anchor component={NavLink} to={`/players/${player.id}`}>{player.data.name}</Anchor>
                            </Group>
                          </div>
                        ))
                      }
                    </SimpleGrid>
                  </Paper>
                </Box>

                <Box mb="xl">
                  <Text>{tournament.description}</Text>
                </Box>

                <Box>
                  {
                    tournament.picflowId &&
                    <Paper className={classes.gallery}>
                      {
                        // Esempio id picflow: gal_4xrFVV48aamykpMu
                        // @ts-ignore
                        <picflow-gallery id={tournament.picflowId} lightbox="#000000E6"></picflow-gallery>
                      }
                    </Paper>
                  }
                </Box>

              </Tabs.Panel>

              <Tabs.Panel value="results">
                <Paper p="xs" bg="var(--mantine-color-gray-1)" className={classes.tournament}>
                  <div className={classes.tournamentInner}>
                    <iframe
                      src={`${tournament.challongeUrl}?multiplier=1`}
                      style={{ width: '100%', height: 1200, border: 0 }}
                    />
                  </div>
                </Paper>
              </Tabs.Panel>

              <Tabs.Panel value="rules">
                <div dangerouslySetInnerHTML={{ __html: tournament.rules }}/>
              </Tabs.Panel>

            </Tabs>
          </Box>
          :
          <Center>
            <Loader size="sm" color="gray"/>
          </Center>
      }
    </>
  )

}
