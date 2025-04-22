import { Dialog, DialogContent, DialogTitle, Paper } from '@mui/material';

import ImportExportContent from './ImportExportContent';
import { useDialogContext } from '../../context/DialogContext';

const ImportExportDialog = () => {
  const {importExportOpen, toggleImportExport} = useDialogContext();
  return (
    <Dialog open={importExportOpen} onClose={toggleImportExport} fullWidth={true}>
      <Paper>
        <DialogTitle>Import/Export</DialogTitle>
        <DialogContent>
          <ImportExportContent/>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}

export default ImportExportDialog;