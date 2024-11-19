import { Container } from '@mantine/core'
import { Outlet } from "react-router-dom"
import { Navbar } from "../../components/organisms/Navbar/Navbar.tsx"

export function LayoutDefault() {

  return (
    <Container>
      <Navbar/>
      <Outlet/>
    </Container>
  )
}
