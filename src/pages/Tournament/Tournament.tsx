import { Anchor, Box, Center, Loader, Tabs, Text, Title, useMantineTheme } from "@mantine/core"
import { useEffect, useRef, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { getPlayer, getTournament } from "../../api/api.ts"


export function Tournament() {

  const params = useParams()
  const navigate = useNavigate()
  const theme = useMantineTheme()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tournament, setTournament] = useState<any>(null)
  const [winner, setWinner] = useState<any>(null)

  useEffect(() => {
    setIsLoading(true)

    if (!params.id) return

    getTournament(params.id)
      .then((data) => {
        if (data !== undefined) {
          setTournament(data)
          getPlayer(data.winner)
            .then((player) => {
              setWinner(player)
            })
            .finally(() => {
              setIsLoading(false)
            })
        } else {
          navigate("/404")
        }
      })

  }, [params.id])

  return (
    <>
      {
        (!isLoading && tournament && winner) ?
          <Box mb="lg">
            <Title order={1} mb="xl">{tournament.name}</Title>

            <Tabs color="green" defaultValue="info">

              <Tabs.List mb="lg">
                <Tabs.Tab value="info">
                  Informazioni
                </Tabs.Tab>
                <Tabs.Tab value="results">
                  Risultati
                </Tabs.Tab>
                <Tabs.Tab value="rules">
                  Regolamento
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="info">
                <Text mb="lg">{tournament.date}</Text>
                <Text mb="lg">
                  🏆 Vincitore torneo:
                  <Anchor ml="xs" component={NavLink} to={`/players/${tournament.winner}`}>{winner.name}</Anchor>
                </Text>
                <Text mb="lg">{tournament.description}</Text>

                {
                  tournament.picflowId &&
                  // Esempio id picflow: gal_4xrFVV48aamykpMu
                  // @ts-ignore
                  <picflow-gallery id={tournament.picflowId} lightbox="#000000E6"></picflow-gallery>
                }
              </Tabs.Panel>

              <Tabs.Panel value="results">
                <iframe
                  src={`${tournament.challongeUrl}?multiplier=1.2`}
                  style={{width: '100%', height: 1200, border: 0}}
                />
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
