import { Box, Center, Loader, Tabs, Text, Title, useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getTournament } from "../../api/api.ts"
import classes from './Tournament.module.css';

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
                {/*<Tabs.Tab value="bracket">*/}
                {/*  Tabellone*/}
                {/*</Tabs.Tab>*/}
                <Tabs.Tab value="results">
                  Risultati
                </Tabs.Tab>
                <Tabs.Tab value="rules">
                  Regolamento
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="info">
                <Text mb="lg">{tournament.date}</Text>
                <Text mb="lg">{tournament.description}</Text>
                {/*<div className="elfsight-app-f0a9de41-52a4-419c-99a0-147abf583eac" data-elfsight-app-lazy></div>*/}

                {
                  // Esempio id picflow: gal_4xrFVV48aamykpMu
                  // @ts-ignore
                  <picflow-gallery id={tournament.picflowId} lightbox="#000000E6"></picflow-gallery>
                }

                {/*<Gallery*/}
                {/*  images={images}*/}
                {/*  enableImageSelection={false}*/}
                {/*/>*/}
              </Tabs.Panel>

              {/*<Tabs.Panel value="bracket">*/}
              {/*  <Bracket*/}
              {/*    rounds={JSON.parse(tournament.rounds)}*/}
              {/*    // roundTitleComponent={(title, roundIndex: number) => {*/}
              {/*    //   return <div style={{ textAlign: 'center', color: 'red' }}>{title}</div>;*/}
              {/*    // }}*/}
              {/*  />*/}
              {/*</Tabs.Panel>*/}

              <Tabs.Panel value="results">
                <iframe src="https://challonge.com/it/rolandpippon1/module" width="100%" height="800" frameBorder="0" scrolling="auto" />
                {/*<div className={classes.table}>*/}
                {/*  <div dangerouslySetInnerHTML={{ __html: '<table><thead><tr><th>Giocatore</th><th>G</th><th>Dif</th><th>Dif</th><th>Pnt</th></tr></thead><tbody><tr><td>Gaetano</td><td>3</td><td>6</td><td>20</td><td>3</td></tr><tr><td>Valerio</td><td>3</td><td>2</td><td>4</td><td>2</td></tr><tr><td>Ciccio</td><td>3</td><td>-3</td><td>-8</td><td>1</td></tr><tr><td>Gianmaro</td><td>3</td><td>-5</td><td>-16</td><td>0</td></tr></tbody></table>' }}/>*/}
                {/*</div>*/}

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
