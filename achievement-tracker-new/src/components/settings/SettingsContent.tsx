import { Box, Typography } from "@mui/material"

import DarkModeToggle from "./options/DarkModeToggle"

const SettingsContent = () => {
  return (
    <Box style={{paddingTop: "1rem"}}>
      <Box>
        <Typography variant="body1" sx={{fontWeight: "bold"}}>General Settings</Typography>
        <DarkModeToggle/>
      </Box>
    </Box>
  )
}

export default SettingsContent
