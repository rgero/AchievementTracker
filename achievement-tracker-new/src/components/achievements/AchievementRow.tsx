import { TableCell, TableRow } from "@mui/material"

import { Achievement } from "../../interfaces/Achievement"
import { convertWeight } from "../../utils/convertWeight"
import {format} from 'date-fns'

const AchievementRow = ({achievement}: {achievement: Achievement}) => {
  return (
    <TableRow>
      <TableCell>{achievement.name}</TableCell>
      <TableCell align="right">{format(achievement.date, "yyyy-MM-dd")}</TableCell>
      <TableCell align="right">{convertWeight(achievement.weight)}</TableCell>
    </TableRow>
  )
}

export default AchievementRow
