import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { Container, Typography, useTheme } from "@mui/material";

import { useAchievements } from "../../context/AchievementContext";

const StatsSortedByYears = () => {
  const {achievements} = useAchievements();
  const theme = useTheme();

  if (achievements.length === 0) {
    return null;
  }
  
  const byYear = Object.entries(
    achievements.reduce((acc, achievement) => {
      const year = new Date(achievement.date).getFullYear().toString();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([year, count]) => ({ year, count }));
  
  return (
    <Container>
      <Typography variant="h5">By Year</Typography>
      <BarChart width={500} height={300} data={byYear}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year"/>
        <YAxis dataKey="count"/>
        <Tooltip contentStyle={{background: theme.palette.background.paper}}cursor={{fill: 'transparent'}} />
        <Bar dataKey="count" fill="#8884d8" background={false} />
      </BarChart>
    </Container>
  )
}

export default StatsSortedByYears
