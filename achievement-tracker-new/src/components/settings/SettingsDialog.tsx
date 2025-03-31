import Dialog from '../ui/Dialog';
import SettingsContent from './SettingsContent';

const SettingsDialog = ({open, setOpen} : {open: boolean, setOpen: (open: boolean) => void}) => {
  return (
    <Dialog open={open} setOpen={setOpen} title={"Settings"}>
      <SettingsContent/>
    </Dialog>
  );
}

export default SettingsDialog;