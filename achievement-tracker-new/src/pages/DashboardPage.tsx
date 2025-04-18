import { Achievement } from "../interfaces/Achievement"
import AchievementForm from "../components/achievements/AchievementForm"
import AchievementTable from "../components/achievement_presentation/AchievementTable"
import { Container } from "@mui/material"
import { useState } from "react"

const DashboardPage = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | undefined>(undefined)

  return (
    <Container disableGutters>
      <AchievementTable set={setSelectedAchievement}/>
      <AchievementForm achievement={selectedAchievement}/>
    </Container>
  )
}

export default DashboardPage
