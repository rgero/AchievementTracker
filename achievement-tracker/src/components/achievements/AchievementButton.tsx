import { Add } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useDialogContext } from "../../context/DialogContext"

const AchievementButton = () => {
  const { achievementFormOpen, toggleAchievementForm } = useDialogContext()
  return (
    <IconButton 
      aria-label="add" 
      onClick={() => toggleAchievementForm()}
      sx={{
        transition: 'color 0.3s ease',
        color: achievementFormOpen ? 'error.main' : 'text.primary',
      }}  
    >
      <Add />
    </IconButton>
  )
}

export default AchievementButton
