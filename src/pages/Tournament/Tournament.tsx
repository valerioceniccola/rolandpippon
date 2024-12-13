import {
  Anchor,
  Avatar,
  Badge,
  Blockquote,
  Box, Button,
  Center,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Tabs,
  Text,
  Title
} from "@mantine/core"
import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { getPlayer, getTournament } from "../../api/api.ts"
import { Helmet } from "react-helmet"
import classes from "./Tournament.module.css"
import { getShortName } from "../../utils/utils.ts"


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

          data.winner ?
            getPlayer(data.winner)
              .then((player) => {
                setWinner({
                  data: player,
                  id: data.winner
                })
              })
            :
            setWinner(null)

          data.winner2 ?
            getPlayer(data.winner2)
              .then((player) => {
                setWinner2({
                  data: player,
                  id: data.winner2
                })
              })
            :
            setWinner(null)

          data.winner3 ?
            getPlayer(data.winner3)
              .then((player) => {
                setWinner3({
                  data: player,
                  id: data.winner3
                })
              })
            :
            setWinner(null)

          setIsLoading(false)

        } else {
          navigate("/404")
        }
      })

  }, [params.id])

  return (
    <>
      {
        (!isLoading && tournament) ?
          <>
            <Helmet>
              <title>{tournament.name}</title>
            </Helmet>
            <Box mb="lg">
              {
                tournament.live ?
                  <Badge size="lg" mb="lg" color="red">Live</Badge>
                  :
                  <Badge size="lg" mb="lg">{tournament.date}</Badge>
              }

              <Title tt="uppercase" order={1} mb="xl">{tournament.name}</Title>

              <Tabs color="shGreen" defaultValue="info">

                <Tabs.List mb="lg">
                  <Tabs.Tab value="info">Il torneo</Tabs.Tab>
                  {
                    tournament.challongeUrl &&
                    <Tabs.Tab value="results">Risultati</Tabs.Tab>
                  }
                  {
                    tournament.rules &&
                    <Tabs.Tab value="rules">Regolamento</Tabs.Tab>
                  }
                </Tabs.List>

                <Tabs.Panel value="info">

                  {
                    (winner && winner2 && winner3) &&
                    <Box mb="lg" py="md">
                      <Paper p="lg" className={classes.winners}>
                        <SimpleGrid cols={3}>
                          {
                            // Ciclo 3 elementi
                            [winner, winner2, winner3].map((player: any, index: number) => {
                              return (
                                <div key={index}>
                                  <Title order={5} tt="uppercase" mb="sm">
                                    <Group justify="flex-start">
                                      <div>🏆</div>
                                      {index + 1}° Posto
                                    </Group>
                                  </Title>
                                  <Group gap="md">
                                    <Avatar
                                      src={`/players/${player.id}.jpg`}
                                      alt={player.data.name}
                                      style={{ border: '2px solid #fff' }}
                                    />
                                    <Anchor component={NavLink} to={`/players/${player.id}`}>
                                      <Text fw="bold">
                                        {getShortName(player.data.name)}
                                      </Text>
                                    </Anchor>
                                  </Group>
                                </div>
                              )
                            })
                          }
                        </SimpleGrid>
                      </Paper>
                    </Box>
                  }

                  <Box mb="xl">
                    <Text>{tournament.description}</Text>
                  </Box>

                  {
                    (tournament.tournamentFee && tournament.paypalUrl) &&
                    <Box mb="xl">
                      <Blockquote radius="md" mt="xl">
                        <Box mb="md">
                          <Text mb="sm">Quota di iscrizione al torneo è di <strong>{tournament.tournamentFee}€</strong>.</Text>
                          <Text size="sm" fs="italic">È utilizzata per coprire i costi delle coppe, dei premi e di tutto il
                            necessario per organizzare al meglio il torneo,
                            garantendo un’esperienza piacevole e ben strutturata per tutti i partecipanti.</Text>
                        </Box>
                        <Button
                          component={NavLink}
                          to={`https://www.paypal.com/pool/${tournament.paypalUrl}`}
                          target="_blank"
                        >
                          Paga quota con Paypal
                        </Button>
                      </Blockquote>
                    </Box>
                  }

                  {
                    tournament.picflowId &&
                    <Box>
                      <Paper className={classes.gallery}>
                        {
                          // Esempio id picflow: gal_4xrFVV48aamykpMu
                          // @ts-ignore
                          <picflow-gallery id={tournament.picflowId} lightbox="#000000E6"></picflow-gallery>
                        }
                      </Paper>
                    </Box>
                  }

                </Tabs.Panel>


                {
                  tournament.challongeUrl &&
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
                }

                {
                  tournament.rules &&
                  <Tabs.Panel value="rules">
                    <div dangerouslySetInnerHTML={{ __html: tournament.rules }}/>
                  </Tabs.Panel>
                }

              </Tabs>
            </Box>
          </>
          :
          <Center>
            <Loader size="sm" color="gray"/>
          </Center>
      }
    </>
  )

}
