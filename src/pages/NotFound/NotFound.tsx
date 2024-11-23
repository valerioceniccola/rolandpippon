import { Button, Text, Title } from '@mantine/core';
import { useNavigate } from "react-router-dom"

export function NotFound() {

  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center' }}>
      <Title mb="lg">Ops! Pagina fuori dal campo! 🎾</Title>
      <Text c="dimmed" size="lg">
        Sembra che questa pagina sia scivolata fuori dai limiti del campo!
        <br/>Forse cercavi un’altra informazione sui tornei?
      </Text>
      <Button variant="outline" size="md" mt="xl" onClick={() => navigate('/')}>
        Torna alla riga di fondo
      </Button>
    </div>
  );
}
