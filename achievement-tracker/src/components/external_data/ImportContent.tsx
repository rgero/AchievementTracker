import { Achievement } from "../../interfaces/Achievement";
import { Box } from "@mui/material"
import FileSelector from "./FileSelector"
import { useAchievementsContext } from "../../context/achievement/AchievementContext";
import { useDialogContext } from "../../context/dialog/DialogContext";

const ImportContent = () => {
  const {addMultipleAchievements} = useAchievementsContext();
  const {toggleImportExport} = useDialogContext();

  const processSubmit = async (data: Achievement[]) => {
    try {
      await addMultipleAchievements(data);
      toggleImportExport();
    } catch (error)
    {
      console.error("Error importing achievements:", error);
    }
  }

  return (
    <Box style={{paddingTop: "1rem", minHeight: "250px"}}>
      <FileSelector onJSONLoad={processSubmit}/>
    </Box>
  )
}

export default ImportContent
