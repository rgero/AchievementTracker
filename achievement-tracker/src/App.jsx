import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import AppLayout from "./ui/AppLayout"
import { DarkModeProvider } from "./context/DarkModeContext"
import DummyPage from "./pages/DummyPage"
import GlobalStyles from "./styles/GlobalStyles"
import PageNotFound from "./pages/PageNotFound"

const App = () => {
  return (
    <DarkModeProvider>
      <GlobalStyles/>
      <BrowserRouter>
          <Routes>
            <Route element={
              <>
                <AppLayout/>
              </>
            }>
              <Route index element={<Navigate replace to='dummy'/>} />
              <Route path='dummy' element={<DummyPage/>} />
              <Route path='*' element={<PageNotFound/>} />
            </Route>

          </Routes>
        </BrowserRouter>
    </DarkModeProvider>
  )
}

export default App
