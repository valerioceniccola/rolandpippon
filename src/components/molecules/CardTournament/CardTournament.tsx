import { Card, Group, RingProgress, TextProps, Text, Button, Title, Badge } from "@mantine/core"
import classes from "./CardTournament.module.css"
import { useNavigate } from "react-router-dom"

interface Props {
  id: string,
  name: string,
  date: string,
  description: string,
  live?: boolean
  registrationsOpen?: boolean
}

export const CardTournament = ({ id, name, date, description, live, registrationsOpen }: Props) => {

  const navigate = useNavigate()

  return (
    <>
      <Card
        withBorder
        padding="lg"
        className={classes.card}
        onClick={() => navigate(`/tournament/${id}`)}
      >

        <Group>
          {
            live &&
            <Badge size="lg" mb="md" color="red" style={{ cursor: 'pointer' }}>Live</Badge>
          }
          {
            registrationsOpen &&
            <Badge size="lg" mb="md" color="green" style={{ cursor: 'pointer' }}>Iscrizioni aperte</Badge>
          }
        </Group>


        <Title order={3} className={classes.title}>
          {name}
        </Title>
        <Text mt="sm" mb="md" c="dimmed" size="sm">
          {description}
        </Text>

        <Card.Section className={classes.footer}>
          <div>
            <Text size="xs" c="dimmed">
              Data
            </Text>
            <Text fw={500} size="sm">
              {date}
            </Text>
          </div>
          <div>
            <Button
              size="xs"
            >
              Vedi dettagli
            </Button>
          </div>
        </Card.Section>
      </Card>
    </>
  )
}
