import { ThemeProvider, createTheme } from "@mui/material";

import CustomToaster from "../../components/ui/CustomToaster";
import { DarkModeContext } from "./DarkModeContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useMemo } from "react";

const DarkModeProvider = ({ children }: {children: React.ReactNode}) => {

  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    "isDarkMode", // First argument should be the key
    window.matchMedia("(prefers-color-scheme: dark)").matches // Default to user's OS setting
  );
  
  const mode = isDarkMode ? "dark" : "light";
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        }
      }),
    [mode]
  );

  const toggleDarkMode = () => {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
      <CustomToaster/>
    </DarkModeContext.Provider>
  );
}
export default DarkModeProvider;