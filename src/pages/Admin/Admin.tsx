import {
  Button,
  ComboboxData,
  Container, CopyButton, Divider,
  PasswordInput,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
  Title
} from "@mantine/core"
import { useEffect, useState } from "react"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../api/api-firebase.ts"
import { getAllTournaments, getTournament } from "../../api/api.ts"
import { collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore"

const htmlRulesExample = `<h1>Regolamento del Torneo di Tennis Locale</h1>                      <h3>1. Iscrizioni e Partecipazione</h3> <ul> \t<li>Il torneo è aperto a tutti i giocatori di età pari o superiore ai 14 anni.</li> \t<li>Ogni partecipante deve presentare un certificato medico sportivo valido.</li> \t<li>La quota di iscrizione è di €20 e deve essere versata al momento della registrazione.</li> </ul>                      <h3>2. Struttura del Torneo</h3> <ul> \t<li>Il torneo si svolgerà in formato ad eliminazione diretta.</li> \t<li>Ogni incontro si disputerà al meglio dei 3 set, con tie-break sul 6-6.</li> \t<li> In caso di pioggia o condizioni meteorologiche avverse, gli incontri saranno rinviati o spostati al coperto, \t\tove possibile. \t</li> </ul>                      <h3>3. Regole di Gioco</h3> <ul> \t<li> Le partite seguiranno il regolamento ufficiale della Federazione Italiana Tennis (FIT).</li> \t<li>È obbligatorio indossare abbigliamento sportivo adeguato e scarpe da tennis.</li> \t<li> I giocatori devono presentarsi almeno 15 minuti prima dell'orario previsto per il loro incontro.</li> </ul>                      <h3>4. Arbitraggio e Comportamento</h3> <ul> \t<li> Le partite saranno autogestite dai giocatori, salvo le fasi finali che avranno un arbitro designato.</li> \t<li>Ogni disputa sarà risolta dal direttore del torneo, il cui giudizio sarà insindacabile.</li> \t<li> È richiesto un comportamento sportivo e rispettoso verso gli avversari e gli organizzatori.</li> </ul>                      <h3>5. Premi</h3> <ul> \t<li>I premi saranno distribuiti ai primi tre classificati del torneo.</li> \t<li>Il vincitore riceverà un trofeo e un premio in denaro di €100.</li> \t<li>Il secondo e il terzo classificato riceveranno premi minori in beni o servizi.</li> </ul>`

export function Admin(props: any) {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectDataTournaments, setSelectDataTournaments] = useState<ComboboxData | undefined>(undefined)
  const [tournamentSelected, setTournamentSelected] = useState<any>(null)

  const formHandleTournament = useForm({
    // mode: 'uncontrolled',
    initialValues: {
      id: '',
      winner: '',
      picflowId: '',
      name: '',
      date: '',
      description: '',
      challongeUrl: '',
      rules: '',
    },
  })

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email non valida'),
    },
  })

  const signInUser = async (values: any) => {

    setIsLoading(true);

    try {
      const data = await signInWithEmailAndPassword(
        auth,
        values.email.trim(),
        values.password
      );

      if (data) {

        setIsLoading(false);

        notifications.show({
          title: 'Hey! 👋🏻',
          message: "L'accesso è stato effettuato correttamente.",
          color: 'green'
        })
      }
    } catch (err) {
      if (err instanceof Error) {
        err.message.includes('auth/user-not-found') ?
          notifications.show({
            title: 'Utente inesistente',
            message: "L'utente che hai inserito non esiste",
            color: 'red'
          })
          :
          notifications.show({
            title: 'Errore generico o credenziali errate',
            message: "Si è verificato un errore generico o i dati non erano corretti",
            color: 'red'
          })

      }
      setIsLoading(false);
    }
  }

  const editTournament = async (values: any) => {
    console.log('Modifico nuovo torneo')
    console.log(values)
    setIsLoading(true)

    try {

      await setDoc(doc(db, 'tournaments', values.id), {
        ...values
      })

      notifications.show({
        title: 'Perfetto!',
        message: "Torneo modificato con successo",
        color: 'green'
      })

      setTournamentSelected(null)

    } catch (err) {
      console.log(err)
      notifications.show({
        title: 'Errore generico',
        message: "Si è verificato un errore, controlla i log",
        color: 'red'
      })
    }

    formHandleTournament.reset()
    setIsLoading(false)
  }

  const addNewTournament = async (values: any) => {
    console.log('Aggiungo nuovo torneo')
    console.log(values)
    setIsLoading(true)

    try {

      const tournamentRef = doc(db, 'tournaments', values.id)
      const docSnapshot = await getDoc(tournamentRef)

      if (!docSnapshot.exists()) {

        // Non esiste un torneo con questo id, procedo alla creazione
        await setDoc(doc(db, 'tournaments', values.id), {
          ...values
        })

        notifications.show({
          title: 'Perfetto!',
          message: "Torneo aggiunto con successo",
          color: 'green'
        })

      } else {

        notifications.show({
          title: 'Attenzione',
          message: "Esiste già un torneo con questo id!",
          color: 'red'
        })
      }

    } catch (err) {
      console.log(err)
      notifications.show({
        title: 'Errore generico',
        message: "Si è verificato un errore, controlla i log",
        color: 'red'
      })
    }

    formHandleTournament.reset()
    setIsLoading(false)
  }

  useEffect(() => {
    if (!props.currentUser) return

    getAllTournaments()
      .then((data) => {
        const comboboxData = data.map((tournament) => {
          return {
            value: tournament.id,
            label: tournament.data.name
          }
        })
        setSelectDataTournaments(comboboxData)
      }).finally(() => {
      setIsLoading(false)
    })
  }, [props.currentUser]);

  return (
    <>
      {
        props.currentUser ?
          <Container size="sm">

            <Select
              label="Modifica un torneo esistente"
              data={selectDataTournaments}
              allowDeselect={false}
              onChange={async (value) => {
                setTournamentSelected(value)

                if (value) {
                  const data = await getTournament(value)
                  if (data) {
                    formHandleTournament.setValues({
                      id: value,
                      name: data.name,
                      date: data.date,
                      winner: data.winner,
                      description: data.description,
                      challongeUrl: data.challongeUrl,
                      rules: data.rules,
                      picflowId: data.picflowId
                    })
                  }
                }
              }}
              mb="lg"
            />

            <Divider my="lg"/>

            <form onSubmit={formHandleTournament.onSubmit((values) => {
              if (tournamentSelected) {
                editTournament(values)
              } else {
                addNewTournament(values)
              }
            })}>


              <SimpleGrid cols={{ base: 1, sm: 2 }}>

                <TextInput
                  disabled={isLoading || tournamentSelected}
                  required
                  label="Id torneo (numerico)"
                  mb="md"
                  {...formHandleTournament.getInputProps('id')}
                />

                <TextInput
                  disabled={isLoading}
                  required
                  label="Nome"
                  mb="md"
                  {...formHandleTournament.getInputProps('name')}
                />

              </SimpleGrid>

              <SimpleGrid cols={{ base: 1, sm: 2 }}>

                <TextInput
                  disabled={isLoading}
                  required
                  label="Data"
                  mb="md"
                  {...formHandleTournament.getInputProps('date')}
                />

                <TextInput
                  disabled={isLoading}
                  required
                  label="Vincitore"
                  mb="md"
                  {...formHandleTournament.getInputProps('winner')}
                />

              </SimpleGrid>

              <SimpleGrid cols={{ base: 1, sm: 2 }}>

                <TextInput
                  disabled={isLoading || tournamentSelected}
                  required
                  label="Url Challonge (per iframe)"
                  mb="md"
                  {...formHandleTournament.getInputProps('challongeUrl')}
                />

                <TextInput
                  disabled={isLoading}
                  required
                  label="Id gallery picflow (dall'embed)"
                  mb="md"
                  {...formHandleTournament.getInputProps('picflowId')}
                />

              </SimpleGrid>

              <Textarea
                disabled={isLoading}
                required
                label="Breve descrizione"
                mb="md"
                rows={4}
                {...formHandleTournament.getInputProps('description')}
              />

              <Textarea
                disabled={isLoading}
                required
                label="Regolamento (in html)"
                mb="md"
                rows={4}
                {...formHandleTournament.getInputProps('rules')}
              />

              <CopyButton value={htmlRulesExample}>
                {({ copied, copy }) => (
                  <Button mb="xl" size="xs" color={copied ? 'teal' : 'shGreen'} onClick={copy}>
                    {copied ? 'Copiato' : 'Copia html di esempio'}
                  </Button>
                )}
              </CopyButton>

              <Button
                type="submit"
                loading={isLoading}
                fullWidth
                mt="md"
                size="md"
                variant="gradient"
              >
                {
                  tournamentSelected ? 'Aggiorna torneo' : 'Inserisci nuovo torneo'
                }
              </Button>

            </form>

          </Container>
          :
          <Container size="xs">
            <form onSubmit={form.onSubmit((values) => signInUser(values))}>
              <TextInput
                label="Email"
                required
                size="md"
                disabled={isLoading}
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                required
                mt="md"
                size="md"
                disabled={isLoading}
                {...form.getInputProps('password')}
              />

              <Button
                type="submit"
                loading={isLoading}
                fullWidth
                mt="xl"
                size="md"
              >
                Accedi
              </Button>
            </form>
          </Container>
      }


    </>
  )

}
