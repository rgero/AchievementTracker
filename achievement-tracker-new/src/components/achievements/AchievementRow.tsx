import { TableCell, TableRow, useMediaQuery, useTheme } from "@mui/material"

import { Achievement } from "../../interfaces/Achievement"
import { convertWeight } from "../../utils/convertWeight"
import {format} from 'date-fns'

const AchievementRow = ({achievement}: {achievement: Achievement}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TableRow>
      <TableCell width="75%">{achievement.name}</TableCell>
      {!isSmallScreen && <TableCell align="right">{format(achievement.date, "yyyy-MM-dd")}</TableCell>}
      <TableCell align="right">{convertWeight(achievement.weight)}</TableCell>
    </TableRow>
  )
}

export default AchievementRow
