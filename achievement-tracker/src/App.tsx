import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AchievementProvider } from "./context/achievement/AchievementProvider";
import AppLayout from "./components/ui/AppLayout";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { AuthenticationProvider } from "./context/authentication/AuthenicationProvider";
import DarkModeProvider from "./context/darkmode/DarkModeProvider";
import DashboardPage from "./pages/DashboardPage";
import { DialogProvider } from "./context/dialog/DialogProvider";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ui/ErrorFallback";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import StatsPage from "./pages/StatsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
    mutations: {
      onError: (error) => {
        console.error(error);
      },
    },
  },
});

const App = () => {
  return (
    <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthenticationProvider>
            <AchievementProvider>
              <DialogProvider>
                <BrowserRouter>
                  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=> window.location.replace("/")}>
                    <Routes>
                      <Route
                        element={
                          <AuthenticatedRoute>
                            <AppLayout />
                          </AuthenticatedRoute>
                        }
                      >
                        <Route path="/dashboard" element={<DashboardPage />}/>
                        <Route path="/stats" element={<StatsPage />}/>
                      </Route>
                      <Route path="/landing" element={<LandingPage />} />
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route element={<AppLayout/>}>
                        <Route path="*" element={<PageNotFound />} />
                      </Route>
                    </Routes>
                  </ErrorBoundary>
                </BrowserRouter>
              </DialogProvider>
            </AchievementProvider>
          </AuthenticationProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </DarkModeProvider>
  );
};

export default App;
