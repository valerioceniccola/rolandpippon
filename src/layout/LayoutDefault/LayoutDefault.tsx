import { Container } from '@mantine/core'
import { Outlet } from "react-router-dom"
import { Navbar } from "../../components/organisms/Navbar/Navbar.tsx"
import { Footer } from "../../components/organisms/Footer/Footer.tsx"

export function LayoutDefault() {

  return (
    <>
      <Navbar/>
      <Container size="md">
        <Outlet/>
        <Footer/>
      </Container>
    </>
  )
}
