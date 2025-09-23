import HeaderMenuOption from "./HeaderMenuOption";
import { ImportExportOutlined } from "@mui/icons-material";
import { useDialogContext } from "../../../context/dialog/DialogContext";

const ImportExportOption = () => {
  const {toggleImportExport} = useDialogContext();
  return (
    <HeaderMenuOption icon={<ImportExportOutlined/>} text="Import/Export" onClick={toggleImportExport}/>
  )
}

export default ImportExportOption
