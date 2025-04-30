import { Container, Typography } from "@mui/material"

import DarkModeToggle from "./options/DarkModeToggle"

const SettingsContent = () => {
  return (
    <Container>
      <Typography variant="body1" sx={{fontWeight: "bold"}}>General Settings</Typography>
      <DarkModeToggle/>
    </Container>
  )
}

export default SettingsContent
