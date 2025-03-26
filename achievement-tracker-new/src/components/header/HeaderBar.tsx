import { AppBar, Grid2 as Grid, Typography } from "@mui/material"

import { Link } from "react-router-dom"
import UserAvatar from "./UserAvatar"

const HeaderBar = () => {
  return (
    <AppBar position="static" sx={{ px: 2, padding: "0.75rem" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
            <img 
              src="/logo.png" 
              alt="The Achievement Tracker" 
              style={{ width: "32px", height: "32px", marginRight: "0.5rem" }} 
            />
            <Typography variant="h6">The Achievement Tracker</Typography>
          </Link>
        </Grid>
        <Grid>
          <UserAvatar />
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default HeaderBar
