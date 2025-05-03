import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Container, Typography, useTheme } from "@mui/material";

import { convertWeight } from "../../utils/convertWeight";
import { useAchievements } from "../../context/AchievementContext";

const StatsByWeight = () => {
  const {achievements} = useAchievements();
  const theme = useTheme();

  const byWeight = Object.entries(
    achievements.reduce((acc, achievement) => {
      const weight = convertWeight(achievement.weight.toString());
      acc[weight] = (acc[weight] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([weight, count]) => ({ weight, count }));

  if (achievements.length === 0) {
    return null;
  }

  return (
    <Container disableGutters sx={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
      <Typography variant="h5">By Weight</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={byWeight}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weight"/>
          <YAxis dataKey="count"/>
          <Tooltip contentStyle={{background: theme.palette.background.paper}}cursor={{fill: 'transparent'}} />
          <Bar dataKey="count" fill="#8884d8" background={false} />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default StatsByWeight
