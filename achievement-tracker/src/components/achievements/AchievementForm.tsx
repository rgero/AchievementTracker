import { Box, Button, Container, FormControl, Grid2 as Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { Achievement } from "../../interfaces/Achievement";
import { AchievementSchema } from "../../schemas/AchievementSchema";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { endOfDay } from "date-fns";
import { useAchievements } from "../../context/AchievementContext";
import { useDialogContext } from "../../context/DialogContext";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const AchievementForm = ({ achievement }: { achievement?: Achievement|null }) => {
  const { addNewAchievement, deleteAchievementById, updateExistingAchievement } = useAchievements();
  const { toggleAchievementForm } = useDialogContext();

  const {control, register, reset, handleSubmit, formState: { errors } } = useForm<Achievement>({
    resolver: zodResolver(AchievementSchema),
    defaultValues: {
      ...achievement,
      id: achievement?.id || undefined,
      name: achievement?.name || "",
      date: achievement?.date ? new Date(achievement.date) : endOfDay(new Date()),
      weight: achievement?.weight || 2,
    },
  });

  useEffect(() => {
    reset({
      id: achievement?.id || undefined,
      name: achievement?.name || "",
      description: achievement?.description || "",
      date: achievement?.date ? new Date(achievement.date) : endOfDay(new Date()),
      weight: achievement?.weight || 2,
    });
  }, [achievement]);

  const onSubmit = (data: Achievement) => {
    try {
      if (data.id) {
        updateExistingAchievement(data);
      } else {
        addNewAchievement(data);
      }
      toggleAchievementForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const processDelete = async () => {
    try {
      if (achievement?.id) {
        await deleteAchievementById(achievement.id);
        toggleAchievementForm();
      }
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
  }

  return (
    <Container maxWidth="sm" disableGutters>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "5px" }}
      >
        <TextField
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message as string}
        />

        <TextField
          label="Description"
          multiline
          rows={4}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message as string}
        />

        <Grid container direction="row" spacing={2}>
          <Grid flex={1}>
            <FormControl fullWidth error={!!errors.weight}>
              <InputLabel id="achievementWeight">Weight</InputLabel>
              <Select
                labelId="achievementWeight"
                id="weight"
                defaultValue={2}
                {...register("weight")}
                error={!!errors.weight}
                label="Weight"
              >
                <MenuItem value={1}>Low</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={3}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <Controller
              name="date"
              control={control}
              defaultValue={endOfDay(new Date())}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    slotProps={{
                      textField: {
                        error: !!errors.date,
                        helperText: errors.date?.message as string,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
        </Grid>

        {achievement?.id && (
          <Button variant="outlined" color="error" onClick={processDelete}>
            Delete
          </Button>
        )}

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Container>
  )
}

export default AchievementForm
