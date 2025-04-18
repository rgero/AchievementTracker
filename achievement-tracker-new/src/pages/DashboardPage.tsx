import { Container, Fab } from "@mui/material"

import AchievementTable from "../components/achievement_presentation/AchievementTable"
import { useDialogContext } from "../context/DialogContext"

const DashboardPage = () => {
  const {toggleAchievementForm} = useDialogContext();
  return (
    <Container disableGutters>
      <AchievementTable/>
      <Fab
        color="primary"
        aria-label="add"
        onClick={toggleAchievementForm}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      />
    </Container>
  )
}

export default DashboardPage
