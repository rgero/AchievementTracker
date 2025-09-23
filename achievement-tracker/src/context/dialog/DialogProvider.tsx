import AchievementDialog from '../../components/achievements/AchievementDialog';
import { DialogContext } from './DialogContext';
import FeedbackDialog from '../../components/feedback/FeedbackDialog';
import ImportExportDialog from '../../components/external_data/ImportExportDialog';
import React from 'react';
import SearchDialog from '../../components/search/SearchDialog';
import SettingsDialog from '../../components/settings/SettingsDialog';

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
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

  const toggleFeedback = () => {
    setFeedbackOpen((prev) => !prev);
  }
  
  return (
    <DialogContext.Provider value={{
      achievementFormOpen,
      feedbackOpen,
      importExportOpen, 
      searchOpen,
      settingsOpen,
      areAnyOpen: settingsOpen || importExportOpen || searchOpen || achievementFormOpen || feedbackOpen,
      toggleImportExport,
      toggleFeedback,
      toggleSearch,
      toggleSettings,
      toggleAchievementForm, 
    }}>
      <AchievementDialog/>
      <SearchDialog/>
      <SettingsDialog/>
      <FeedbackDialog/>
      <ImportExportDialog/>
      {children}
    </DialogContext.Provider>
  );
};

