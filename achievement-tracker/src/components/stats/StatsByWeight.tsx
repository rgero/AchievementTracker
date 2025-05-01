import { Container, Divider, Grid2 as Grid, Typography } from "@mui/material";

import { convertWeight } from "../../utils/convertWeight";
import { useAchievements } from "../../context/AchievementContext";

const StatsByWeight = () => {
  const {achievements} = useAchievements();
  const byWeight: Record<string, number> = achievements.reduce((acc, achievement) => {
    const weight: number = achievement.weight;
    if (!acc[weight]) {
      acc[weight] = 0;
    }
    acc[weight]++;
    return acc;
  }, {} as Record<string, number>);

  if (achievements.length === 0) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h5">By Weight</Typography>
      <Grid container direction="column" sx={{border: "1px solid", borderRadius: 5, padding: "10px"}}>
        {Object.entries(byWeight).sort(([a], [b]) => Number(b) - Number(a)).map(([weight, count]) => {
          return (
            <Grid container direction="row" key={weight} justifyContent="space-between">
              <Grid>{convertWeight(weight)}</Grid>
              <Divider orientation="vertical" flexItem sx={{margin: "0 10px"}}/>
              <Grid>{count}</Grid>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default StatsByWeight
