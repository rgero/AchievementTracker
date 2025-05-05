import { Box, Dialog, DialogContent, Paper, Tab, Tabs } from '@mui/material';

import ExportContent from './ExportContent';
import ImportContent from './ImportContent';
import TabPanel from './TabPanel';
import { useDialogContext } from '../../context/DialogContext';
import { useState } from 'react';

const ImportExportDialog = () => {
  const {importExportOpen, toggleImportExport} = useDialogContext();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog open={importExportOpen} onClose={toggleImportExport} fullWidth={true}>
      <Paper>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="Import Export tabs">
              <Tab label="Import" id="import-tab" aria-controls='import-tab'/>
              <Tab label="Export" id="export-tab" aria-controls='export-tab' />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ImportContent/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ExportContent/>
          </TabPanel>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}

export default ImportExportDialog;