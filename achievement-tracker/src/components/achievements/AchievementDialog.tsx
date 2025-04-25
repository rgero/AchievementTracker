import AchievementForm, { AchievementFormHandle } from "./AchievementForm"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fade, Grid2 as Grid, IconButton, Paper } from "@mui/material"

import { Achievement } from "../../interfaces/Achievement";
import {Delete} from "@mui/icons-material"
import { useAchievements } from "../../context/AchievementContext"
import { useDialogContext } from "../../context/DialogContext";
import { useRef } from "react";
import { useState } from "react";

const AchievementDialog = () => {
  const {achievementFormOpen, toggleAchievementForm} = useDialogContext();
  const { selectedAchievement, clearSelectedAchievement, addNewAchievement, updateExistingAchievement, deleteAchievementById } = useAchievements();
  const formRef = useRef<AchievementFormHandle>(null);
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = () => {
    if (selectedAchievement) clearSelectedAchievement();
    setShowDelete(false);
    toggleAchievementForm();
  };

  const handleFormSubmit = async (data: Achievement) => {
    try {
      if (data.id) {
        await updateExistingAchievement(data);
      } else {
        await addNewAchievement(data);
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedAchievement?.id) {
        await deleteAchievementById(selectedAchievement.id);
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
  };

  const handleSubmitClick = () => {
    formRef.current?.submit();
  };

  return (
    <Dialog open={achievementFormOpen} onClose={handleClose}>
      <Paper>
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid>{selectedAchievement ? "Edit Achievement" : "Add Achievement"}</Grid>
            {selectedAchievement && (
              <Grid>
                <IconButton 
                  aria-label="delete" 
                  onClick={() => setShowDelete(prev => !prev)}
                  sx={{
                    transition: 'color 0.3s ease',
                    color: showDelete ? 'error.main' : 'text.primary',
                  }}  
                >
                  <Delete />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </DialogTitle>
        <DialogContent>
          <AchievementForm
            ref={formRef}
            achievement={selectedAchievement || undefined}
            onSubmit={handleFormSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Fade in={showDelete}><div><Button color="error" onClick={handleDelete}>Delete</Button></div></Fade>
          <Button onClick={handleSubmitClick}>Submit</Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default AchievementDialog;
