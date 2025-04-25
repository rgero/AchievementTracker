import { Dialog, DialogContent, DialogTitle, Paper, Typography } from '@mui/material';

import { useDialogContext } from '../../context/DialogContext';

const SearchDialog = () => {
  const {searchOpen, toggleSearch} = useDialogContext();
  return (
    <Dialog open={searchOpen} onClose={toggleSearch} fullWidth={true}>
      <Paper>
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <Typography>Search</Typography>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}

export default SearchDialog;