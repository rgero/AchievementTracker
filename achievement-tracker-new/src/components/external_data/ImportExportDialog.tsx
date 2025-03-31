import Dialog from '../ui/Dialog';
import ImportExportContent from './ImportExportContent';

const ImportExportDialog = ({open, setOpen} : {open: boolean, setOpen: (open: boolean) => void}) => {
  return (
    <Dialog open={open} setOpen={setOpen} title={"Import/Export"}>
      <ImportExportContent/>
    </Dialog>
  );
}

export default ImportExportDialog;