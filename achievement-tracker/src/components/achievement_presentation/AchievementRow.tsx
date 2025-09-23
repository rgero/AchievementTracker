import { TableCell, TableRow, useMediaQuery, useTheme } from "@mui/material"

import { Achievement } from "../../interfaces/Achievement"
import { convertWeight } from "../../utils/convertWeight"
import {format} from 'date-fns'
import { useAchievementsContext } from "../../context/achievement/AchievementContext"
import { useDialogContext } from "../../context/DialogContext"

const AchievementRow = ({achievement}: {achievement: Achievement}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const {selectedAchievement, processSelectionChange} = useAchievementsContext();
  const {toggleAchievementForm} = useDialogContext();

  const processClick = () => {
    if (!achievement || !achievement.id) return;
    processSelectionChange(achievement.id);
    toggleAchievementForm();
  }

  return (
    <TableRow hover key={achievement.id} onClick={processClick} selected={selectedAchievement?.id === achievement.id} sx={{cursor: 'pointer'}}>
      <TableCell width="75%">{achievement.name}</TableCell>
      {!isSmallScreen && <TableCell align="right">{format(new Date(achievement.date), "yyyy-MM-dd")}</TableCell>}
      <TableCell align="right">{convertWeight(achievement.weight)}</TableCell>
    </TableRow>
  )
}

export default AchievementRow
