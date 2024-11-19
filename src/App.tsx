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
import { Dashboard } from "./pages/Dashboard/Dashboard.tsx"

function App() {

  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="light"
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
        </Route>
      </Routes>

    </MantineProvider>
  )
}

export default App
