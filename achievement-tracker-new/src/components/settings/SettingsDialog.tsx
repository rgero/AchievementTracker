import { Dialog, DialogContent, DialogTitle, Paper } from '@mui/material';

import SettingsContent from './SettingsContent';

const SettingsDialog = ({open, setOpen} : {open: boolean, setOpen: (open: boolean) => void}) => {
  return (
    <Dialog open={open} onClose={()=> setOpen(false)} fullWidth={true}>
      <Paper>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <SettingsContent/>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}

export default SettingsDialog;