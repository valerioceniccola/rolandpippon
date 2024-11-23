import { Box, Center, Loader, Tabs, Text, Title, useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTournament } from "../../api/api.ts"


export function Tournament() {

  const params = useParams()
  const navigate = useNavigate()
  const theme = useMantineTheme()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tournament, setTournament] = useState<any>(null)

  useEffect(() => {
    setIsLoading(true)

    if (!params.id) return

    getTournament(params.id)
      .then((data) => {
        if (data !== undefined) {
          setTournament(data)
        } else {
          navigate("/404")
        }
      })
      .finally(() => {
        setIsLoading(false)
      })

  }, [params.id])

  return (
    <>
      {
        (!isLoading && tournament) ?
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
                <Text mb="lg">Vincitore torneo: {tournament.winner}</Text>
                <Text mb="lg">{tournament.description}</Text>

                {
                  tournament.picflowId &&
                  // Esempio id picflow: gal_4xrFVV48aamykpMu
                  // @ts-ignore
                  <picflow-gallery id={tournament.picflowId} lightbox="#000000E6"></picflow-gallery>
                }
              </Tabs.Panel>

              <Tabs.Panel value="results">
                <iframe src={tournament.challongeUrl} style={{width: '100%', height: 800, border: 0,}} />
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
