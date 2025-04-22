import { Dialog, DialogContent, DialogTitle, Paper } from "@mui/material"

import AchievementForm from "./AchievementForm"
import { useAchievements } from "../../context/AchievementContext"

const AchievementDialog = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const { selectedAchievement, clearSelectedAchievement } = useAchievements();

  const handleClose = () => {
    if (selectedAchievement) {
      clearSelectedAchievement();
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Paper>
        <DialogTitle>{selectedAchievement ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
        <DialogContent>
          <AchievementForm achievement={selectedAchievement || undefined} />
        </DialogContent>
      </Paper>
    </Dialog>
  );
};

export default AchievementDialog;
