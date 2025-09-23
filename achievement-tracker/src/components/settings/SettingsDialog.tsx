import { Dialog, DialogContent, DialogTitle, Paper } from '@mui/material';

import SettingsContent from './SettingsContent';
import { useDialogContext } from '../../context/dialog/DialogContext';

const SettingsDialog = () => {
  const {settingsOpen, toggleSettings} = useDialogContext();
  return (
    <Dialog open={settingsOpen} onClose={toggleSettings} fullWidth={true}>
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