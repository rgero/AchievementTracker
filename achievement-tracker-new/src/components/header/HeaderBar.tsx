import { AppBar, Box, Grid2 as Grid, Typography } from "@mui/material"

import { Link } from "react-router-dom"
import UserAvatar from "./UserAvatar"

const HeaderBar = () => {
  return (
    <AppBar position="static" sx={{ px: 2, padding: "0.75rem" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
            <Box sx={{
              width: { xs: "24px", md: "32px" },
              height: { xs: "24px", md: "32px" },
              marginRight: "0.5rem"
            }}>
              <img 
                src="/logo.png" 
                alt="Achievement Tracker" 
                style={{ width: "100%", height: "100%" }} // Ensure img fills the Box
              />
            </Box>
            <Typography variant="h6">Achievement Tracker</Typography>
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
