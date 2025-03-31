import HeaderMenuOption from "./HeaderMenuOption";
import { Settings } from "@mui/icons-material";
import { useDialogContext } from "../../../context/DialogContext";

const SettingsOption = () => {
  const {toggleSettings} = useDialogContext();
  return (
    <HeaderMenuOption icon={<Settings/>} text="Settings" onClick={toggleSettings}/>
  )
}

export default SettingsOption
