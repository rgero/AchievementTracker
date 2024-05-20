import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import Account from "./pages/Account";
import AppLayout from "./ui/AppLayout"
import { DarkModeProvider } from "./context/DarkModeContext"
import DashboardPage from "./pages/DashboardPage";
import GlobalStyles from "./styles/GlobalStyles"
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound"
import ProtectedRoute from "./ui/ProtectedRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import StatsPage from "./pages/StatsPage";
import { Toaster } from "react-hot-toast"
import ViewAchievementPage from "./pages/ViewAchievementPage";

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
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles/>
        <BrowserRouter>
            <Routes>
              <Route element={
                <ProtectedRoute>
                  <AppLayout/>
                </ProtectedRoute>
              }>
                <Route index element={<Navigate replace to="dashboard"/>}/>
                <Route path='account' element={<Account/>} />
                <Route path="dashboard" element={<DashboardPage/>}/>
                <Route path="stats" element={<StatsPage/>}/>
                <Route path="achievements/:achievementID" element={<ViewAchievementPage/>}/>
              </Route>
              <Route path="landing" element={<LandingPage/>} />
              <Route path='*' element={<PageNotFound/>} />
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
