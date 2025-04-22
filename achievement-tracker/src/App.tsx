import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AchievementProvider } from "./context/AchievementContext";
import AppLayout from "./components/ui/AppLayout";
import { AuthProvider } from "./context/AuthenticationContext";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import DashboardPage from "./pages/DashboardPage";
import { DialogProvider } from "./context/DialogContext";
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

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AchievementProvider>
            <DialogProvider>
                <BrowserRouter>
                  <Routes>
                    {/* Redirect root ("/") to dashboard */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    <Route element={
                      <AuthenticatedRoute>
                        <AppLayout />
                        </AuthenticatedRoute>
                    }>
                      <Route index path="/dashboard" element={<DashboardPage />} />
                    </Route>
                    <Route path="/landing" element={<LandingPage />} />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </BrowserRouter>
            </DialogProvider>
          </AchievementProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

export default App;
