import HeaderMenuOption from "./HeaderMenuOption";
import { Settings } from "@mui/icons-material";

const SettingsOption = () => {
  return (
    <HeaderMenuOption icon={<Settings/>} text="Settings" onClick={() => alert("Settings not implemented yet")}/>
  )
}

export default SettingsOption
