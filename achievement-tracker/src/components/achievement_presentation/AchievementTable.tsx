import * as React from 'react';

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, useMediaQuery, useTheme,} from '@mui/material';

import AchievementRow from './AchievementRow';
import TableHeader from './AchievementTableHeader';
import { useAchievements } from '../../context/AchievementContext';

const AchievementsTable = () => {
  const {achievements} = useAchievements();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  if (!achievements || achievements.length === 0)
    return ( <Typography variant="h6" align="center">No achievements found</Typography> ); 

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - achievements.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Achievement Table">
        <TableHead>
          <TableRow>
            <TableHeader sx={{ width: {xs: "60%", md: "75%"}}}>Name</TableHeader>
            {!isSmallScreen && <TableHeader align="right">Date</TableHeader>}
            <TableHeader align="right">Weight</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? achievements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : achievements).map((achievement) => (
            <AchievementRow key={achievement.id} achievement={achievement} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={achievements.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={isSmallScreen ? "Row" : "Rows per page"}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      />
    </TableContainer>
  );
}

export default AchievementsTable;