import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import AppLayout from "./ui/AppLayout"
import { DarkModeProvider } from "./context/DarkModeContext"
import DummyPage from "./pages/DummyPage"
import GlobalStyles from "./styles/GlobalStyles"
import Login from "./pages/LoginPage"
import PageNotFound from "./pages/PageNotFound"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000
    }
  }
})

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
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
            <Route path='login' element={<Login/>} />
          </Routes>
        </BrowserRouter>
        <Toaster 
          position="top-center"
          gutter={12}
          containerStyle={{margin: "8px"}}
          toastOptions={
            {
              success: {duration: 3000}, 
              error: {duration: 5000},
              style: { 
                fontSize: '16px', 
                maxWidth: '500px', 
                padding: '16px 24px', 
                backgroundColor: 'var(--color-grey-0)', 
                color: 'var(--color-grey-700)' 
              }
            }
          }
        />
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App
