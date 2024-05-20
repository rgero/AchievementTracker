import { HiArrowRightOnRectangle, HiOutlineMoon, HiOutlineSun, HiOutlineUser } from "react-icons/hi2";

import Menus from "./Menus";
import { TfiStatsUp } from "react-icons/tfi";
import { useDarkMode } from "../context/DarkModeContext";
import { useLogout } from "../features/authentication/hooks/useLogout";
import { useNavigate } from "react-router-dom";

const HeaderMenu = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const {logout} = useLogout();
  
  return (
    <Menus>
      <Menus.Menu>
        <Menus.Toggle id="userMenu" />
        <Menus.List id="userMenu">
          <Menus.Button icon={<TfiStatsUp />} onClick={() => navigate(`/stats`)}>
            View Stats
          </Menus.Button>
          <Menus.Separator/>
          <Menus.Button icon={<HiOutlineUser />} onClick={() => navigate(`/account`)}>
            Update User Info
          </Menus.Button>
          <Menus.Button icon={isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />} onClick={toggleDarkMode}>
            Toggle {isDarkMode ? "Light" : "Dark"} Mode
          </Menus.Button>
          <Menus.Button icon={<HiArrowRightOnRectangle />} onClick={logout}>
            Log out
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Menus>
  );
}

export default HeaderMenu;
