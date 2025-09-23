import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Clear } from '@mui/icons-material';
import { useAchievementsContext } from '../../context/achievement/AchievementContext';
import { useDialogContext } from '../../context/DialogContext';

const SearchDialog = () => {
  const {searchOpen, toggleSearch} = useDialogContext();

  const {searchQuery, setSearchQuery, startDate, endDate, setStartDate, setEndDate} = useAchievementsContext();

  const handleClearAll = () => {
    setSearchQuery('');
    setStartDate(null);
    setEndDate(null);
  }

  return (
    <Dialog open={searchOpen} onClose={toggleSearch} fullWidth={true}>
      <Paper>
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <TextField
            id="search"
            label="Name"
            type="search"
            variant="filled"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery('')}>
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2} direction="column" justifyContent="center" sx={{ marginTop: 2 }}>
              <Grid>
                <MobileDatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  sx={{width: '100%'}}
                />
              </Grid>
              <Grid>
                <MobileDatePicker 
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  sx={{width: '100%'}}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearAll} color="primary">
            Clear All
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}

export default SearchDialog;