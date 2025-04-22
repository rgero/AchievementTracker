import { Grid2 as Grid, Typography } from "@mui/material"

import DarkModeToggle from "./options/DarkModeToggle"

const SettingsContent = () => {
  return (
    <Grid container sx={{alignItems: "center", justifyContent: "space-between"}}>
      <Grid>
        <Typography variant="body1" sx={{fontWeight: "bold"}}>General Settings</Typography>
      </Grid>
      <Grid>
        <DarkModeToggle/>
      </Grid>
    </Grid>
  )
}

export default SettingsContent
