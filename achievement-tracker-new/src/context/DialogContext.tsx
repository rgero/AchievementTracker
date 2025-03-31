import React, { createContext, useContext } from 'react';

import ImportExportDialog from '../components/external_data/ImportExportDialog';
import SettingsDialog from '../components/settings/SettingsDialog';

interface DialogContextType {
  importExportOpen: boolean;
  settingsOpen: boolean;
  areAnyOpen: boolean;
  toggleImportExport: () => void;
  toggleSettings: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [importExportOpen, setImportExportOpen] = React.useState(false);

  const toggleSettings = () => {
    setSettingsOpen((prev) => !prev);
  }

  const toggleImportExport = () => {
    setImportExportOpen((prev) => !prev);
  }

  return (
    <DialogContext.Provider value={{
      importExportOpen, 
      settingsOpen,
      areAnyOpen: settingsOpen || importExportOpen,  
      toggleImportExport,
      toggleSettings  
    }}>
      <SettingsDialog open={settingsOpen} setOpen={setSettingsOpen}/>
      <ImportExportDialog open={importExportOpen} setOpen={setImportExportOpen}/>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialogContext must be used within an DialogProvider');
  }
  return context;
};