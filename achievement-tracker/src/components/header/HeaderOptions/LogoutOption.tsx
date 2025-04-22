import HeaderMenuOption from "./HeaderMenuOption";
import { Logout } from "@mui/icons-material";
import { useAuth } from "../../../context/AuthenticationContext";

const LogoutOption = () => {
  const {logout} = useAuth();
  return (
    <HeaderMenuOption icon={<Logout/>} text="Log out" onClick={logout}/>
  )
}

export default LogoutOption
