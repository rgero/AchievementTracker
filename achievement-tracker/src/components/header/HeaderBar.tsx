import { AppBar, Box, Grid2 as Grid, Typography } from "@mui/material"

import AchievementButton from "../achievements/AchievementButton"
import { Link } from "react-router-dom"
import SearchButton from "../search/SearchButton"
import UserAvatar from "./UserAvatar"
import { useAuth } from "../../context/AuthenticationContext"

const HeaderBar = () => {
  const {user} = useAuth();
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
        {user && (
          <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
            <Grid>
              <SearchButton/>
            </Grid>
            <Grid>
              <AchievementButton/>
            </Grid>
            <Grid>
              <UserAvatar />
            </Grid>
          </Grid>
        )}
      </Grid>
    </AppBar>
  )
}

export default HeaderBar
