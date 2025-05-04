import { Dialog, DialogContent, DialogTitle, Paper } from '@mui/material';

import ImportContent from './ImportContent';
import { useDialogContext } from '../../context/DialogContext';

const ImportExportDialog = () => {
  const {importExportOpen, toggleImportExport} = useDialogContext();
  return (
    <Dialog open={importExportOpen} onClose={toggleImportExport} fullWidth={true}>
      <Paper>
        <DialogTitle>Import/Export</DialogTitle>
        <DialogContent>
          <ImportContent/>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}

export default ImportExportDialog;