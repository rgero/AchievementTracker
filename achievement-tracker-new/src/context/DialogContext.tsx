import React, { createContext, useContext } from 'react';

import SettingsDialog from '../components/settings/SettingsDialog';

interface DialogContextType {
  settingsOpen: boolean;
  areAnyOpen: boolean;
  toggleSettings: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const toggleSettings = () => {
    setSettingsOpen((prev) => !prev); // Toggle the settings dialog open state
  }

  return (
    <DialogContext.Provider value={{ 
      settingsOpen,
      areAnyOpen: settingsOpen,  
      toggleSettings  
    }}>
      <SettingsDialog
        open={settingsOpen}
        setOpen={setSettingsOpen}
      />
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