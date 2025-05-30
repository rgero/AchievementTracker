import { Box, Container, FormControl, Grid2 as Grid, InputLabel, MenuItem, Select, TextField, useMediaQuery, useTheme } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { forwardRef, useImperativeHandle } from "react";

import { Achievement } from "../../interfaces/Achievement";
import { AchievementSchema } from "../../schemas/AchievementSchema";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { endOfDay } from "date-fns";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export interface AchievementFormHandle {
  submit: () => void;
}

interface AchievementFormProps {
  achievement?: Achievement | null;
  onSubmit?: (data: Achievement) => void;
}

const AchievementForm = forwardRef<AchievementFormHandle, AchievementFormProps>(
  ({ achievement, onSubmit: handleParentSubmit }, ref) => {
  const { control, register, reset, handleSubmit, formState: { errors } } = useForm<Achievement>({
    resolver: zodResolver(AchievementSchema),
    defaultValues: {
      ...achievement,
      id: achievement?.id || undefined,
      name: achievement?.name || "",
      date: achievement?.date ? new Date(achievement.date) : endOfDay(new Date()),
      weight: achievement?.weight || 2,
    },
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit)(),
  }));

  const onSubmit = (data: Achievement) => {
    handleParentSubmit?.(data);
  };

  useEffect(() => {
    reset({
      id: achievement?.id || undefined,
      name: achievement?.name || "",
      description: achievement?.description || "",
      date: achievement?.date ? new Date(achievement.date) : endOfDay(new Date()),
      weight: achievement?.weight || 2,
    });
  }, [achievement]);

  return (
    <Container maxWidth="sm" disableGutters>
      <Box
        component="form"
        noValidate
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
        <Grid container direction={isMobile ? "column" : "row"} spacing={2}>
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
      </Box>
    </Container>
  );
});

export default AchievementForm
