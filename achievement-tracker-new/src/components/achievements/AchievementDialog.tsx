import { Dialog, DialogContent, DialogTitle, Paper } from "@mui/material"

import AchievementForm from "./AchievementForm"
import { useAchievements } from "../../context/AchievementContext";

const AchievementDialog = ({open, setOpen} : {open: boolean, setOpen: (open: boolean) => void}) => {
  const {selectedAchievements} = useAchievements();
  
  return (
    <Dialog open={open} onClose={()=>setOpen(false)}>
      <Paper>
        <DialogTitle>{selectedAchievements.size == 1 ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
        <DialogContent>
          <AchievementForm/>
        </DialogContent>
      </Paper>
    </Dialog>
  )
}

export default AchievementDialog
