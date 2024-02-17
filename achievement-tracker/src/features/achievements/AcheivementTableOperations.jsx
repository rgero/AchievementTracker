import SortBy from "../../ui/SortBy"
import TableOperations from "../../styles/TableOperations"

const AchievementTableOperations = () => {
  return (
    <TableOperations>
      <SortBy options={[
        {value: "date-des", label: "Sort By Date (newest first)"},
        {value: "date-asc", label: "Sort By Date (oldest first)"},
        {value: "name-asc", label: "Sort By Name (A-Z)"},
        {value: "name-des", label: "Sort By Name (Z-A)"},
        {value: "weight-asc", label: "Sort By Priority (low first)"},
        {value: "weight-des", label: "Sort By Priority (high first)"}
      ]}/>
    </TableOperations>
  )
}

export default AchievementTableOperations
