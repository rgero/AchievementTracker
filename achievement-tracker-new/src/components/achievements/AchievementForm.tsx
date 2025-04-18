import { Box, Button, Container, FormControl, Grid2 as Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { Achievement } from "../../interfaces/Achievement";
import { AchievementSchema } from "../../schemas/AchievementSchema";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { endOfDay } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";

const AchievementForm = ({ achievement }: { achievement?: Achievement }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Achievement>({
    resolver: zodResolver(AchievementSchema),
    defaultValues: {
      ...achievement,
      name: achievement?.name || "",
      date: achievement?.date ? new Date(achievement.date) : endOfDay(new Date()),
      weight: achievement?.weight || "medium",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Add Achievement
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
                  defaultValue={"medium"}
                  {...register("weight")}
                  error={!!errors.weight}
                  label="Weight"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
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

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default AchievementForm
