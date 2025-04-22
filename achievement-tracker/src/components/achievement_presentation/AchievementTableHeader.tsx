import { TableCell, TableCellProps, Typography } from "@mui/material";

import { useAchievements } from "../../context/AchievementContext";

interface TableHeaderProps extends TableCellProps {
  children: React.ReactNode;
}

const TableHeader = ({ children, ...rest }: TableHeaderProps) => {
  const { sortBy, sortByDirection, setSortBy, flipSortDirection } = useAchievements();

  const processSortChange = () => {
    if (sortBy === (children as string)) {
      flipSortDirection();
    } else {
      setSortBy(children as string);
    }
  };

  const sortBySymbol = sortBy === (children as string) ? (sortByDirection ? "▼" : "▲") : undefined;
  return (
    <TableCell onClick={processSortChange} {...rest}>
      <Typography sx={{ fontWeight: "bold"}}>
        {sortBySymbol} {children}
      </Typography>
    </TableCell>
  );
};

export default TableHeader;
