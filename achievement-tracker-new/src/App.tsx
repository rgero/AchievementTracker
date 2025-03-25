import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { AchievementProvider } from "./context/AchievementContext";
import { AuthProvider } from "./context/AuthenticationContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000, // Keep existing staleTime
    },
    mutations: {
      onError: (error) => {
        console.error(error);
      },
    },
  },
});

// queryClient.getQueryCache().subscribe((event) => {
//   if (event?.type === 'observerResultsUpdated' && event.result?.isError) {
//     console.error("ERROR");
//   }
// });

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AchievementProvider>
              <BrowserRouter>
              <Routes>
                <Route path="landing" element={<LandingPage/>} />
                <Route path='*' element={<PageNotFound/>} />
              </Routes>
            </BrowserRouter>
          </AchievementProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </DarkModeProvider>
  )

}

export default App
