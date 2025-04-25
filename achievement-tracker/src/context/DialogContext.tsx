import React, { createContext, useContext } from 'react';

import AchievementDialog from '../components/achievements/AchievementDialog';
import ImportExportDialog from '../components/external_data/ImportExportDialog';
import SearchDialog from '../components/search/SearchDialog';
import SettingsDialog from '../components/settings/SettingsDialog';

interface DialogContextType {
  achievementFormOpen: boolean;
  importExportOpen: boolean;
  settingsOpen: boolean;
  searchOpen: boolean;
  areAnyOpen: boolean;
  toggleImportExport: () => void;
  toggleAchievementForm: () => void;
  toggleSearch: () => void;
  toggleSettings: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [importExportOpen, setImportExportOpen] = React.useState(false);
  const [achievementFormOpen, setachievementFormOpen] = React.useState(false);

  const toggleAchievementForm = () => {
    setachievementFormOpen((prev) => !prev);
  }

  const toggleSettings = () => {
    setSettingsOpen((prev) => !prev);
  }

  const toggleImportExport = () => {
    setImportExportOpen((prev) => !prev);
  }

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  }


  return (
    <DialogContext.Provider value={{
      achievementFormOpen,
      importExportOpen, 
      searchOpen,
      settingsOpen,
      areAnyOpen: settingsOpen || importExportOpen || searchOpen || achievementFormOpen,  
      toggleImportExport,
      toggleSearch,
      toggleSettings,
      toggleAchievementForm, 
    }}>
      <AchievementDialog/>
      <SearchDialog/>
      <SettingsDialog/>
      <ImportExportDialog/>
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