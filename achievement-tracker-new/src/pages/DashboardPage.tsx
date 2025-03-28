import { Container, Typography } from "@mui/material"

import AchievementTable from "../components/achievements/AchievementTable"

const DashboardPage = () => {

  return (
    <Container disableGutters>
      <AchievementTable/>
    </Container>
  )
}

export default DashboardPage
