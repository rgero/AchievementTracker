import { Container, Typography } from "@mui/material"

import AchievementTable from "../components/achievements/AchievementTable"

const DashboardPage = () => {

  return (
    <Container disableGutters>
      <Typography>Dashboard Page</Typography>
      <AchievementTable/>
    </Container>
  )
}

export default DashboardPage
