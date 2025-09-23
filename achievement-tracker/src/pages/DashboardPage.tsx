import { Container, Fab } from "@mui/material"

import AchievementTable from "../components/achievement_presentation/AchievementTable"
import { Add } from "@mui/icons-material";
import { useDialogContext } from "../context/dialog/DialogContext";

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
      >
        <Add />
      </Fab>
    </Container>
  )
}

export default DashboardPage
