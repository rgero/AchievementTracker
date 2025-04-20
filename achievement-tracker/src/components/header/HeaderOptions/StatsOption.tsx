import HeaderMenuOption from "./HeaderMenuOption";
import { QueryStats } from "@mui/icons-material";

const StatsOption = () => {
  return (
    <HeaderMenuOption icon={<QueryStats/>} text="Stats" onClick={() => alert("Stats not implemented yet")}/>
  )
}

export default StatsOption
