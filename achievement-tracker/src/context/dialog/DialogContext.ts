import { createContext, useContext } from "react";

export interface DialogContextType {
  achievementFormOpen: boolean;
  feedbackOpen: boolean;
  importExportOpen: boolean;
  settingsOpen: boolean;
  searchOpen: boolean;
  areAnyOpen: boolean;
  toggleImportExport: () => void;
  toggleFeedback: () => void;
  toggleAchievementForm: () => void;
  toggleSearch: () => void;
  toggleSettings: () => void;
}

export const DialogContext = createContext<DialogContextType | null>(null);

export const useDialogContext = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (context === null) {
    throw new Error('useDialogContext must be used within an DialogProvider');
  }
  return context;
};