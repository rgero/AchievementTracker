import { Container, Divider, Grid2 as Grid, Typography } from "@mui/material";

import { useAchievements } from "../../context/AchievementContext";

const StatsSortedByYears = () => {
  const {achievements} = useAchievements();
  const byYear: Record<string, number> = achievements.reduce((acc, achievement) => {
    const year = new Date(achievement.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = 0;
    }
    acc[year]++;
    return acc;
  }, {} as Record<string, number>);

  if (achievements.length === 0) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h5">By Year</Typography>
      <Grid container direction="column" sx={{ border: "1px solid", borderRadius: 5, p: 2 }}>
        {Object.entries(byYear)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, count]) => (
            <Grid
              container
              direction="row"
              key={year}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Grid>{year}</Grid>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Grid>{count}</Grid>
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default StatsSortedByYears
