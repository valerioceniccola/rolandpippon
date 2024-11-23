import "@mantine/core/styles.css"
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { theme } from "./theme.ts"
import { Helmet } from "react-helmet"
import { projectName } from "./utils/constants.ts"
import { ScrollToTop } from "./utils/scrollToTop.tsx"
import { Route, Routes } from "react-router-dom"
import { LayoutDefault } from "./layout/LayoutDefault/LayoutDefault.tsx"
import { Admin } from "./pages/Admin/Admin.tsx"
import { Tournament } from "./pages/Tournament/Tournament.tsx"
import { NotFound } from "./pages/NotFound/NotFound.tsx"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./api/api-firebase.ts"
import { Dashboard } from "./pages/Dashboard/Dashboard.tsx"

function App() {

  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {

    // Listner sull'auth dell'utente
    onAuthStateChanged(auth, (data) => {
      setCurrentUser(data)
    })

  }, [])

  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
    >
      <Helmet
        titleTemplate={`%s | ${projectName}`}
        defaultTitle={projectName}
      >
        <meta name="description" content={projectName} />
      </Helmet>

      <ScrollToTop/>
      <Notifications />

      <Routes>
        <Route element={<LayoutDefault/>}>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/tournament/:id" element={<Tournament />}/>
          <Route path="/admin" element={<Admin currentUser={currentUser}/>}/>
          <Route path="/404" element={<NotFound/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>

    </MantineProvider>
  )
}

export default App
