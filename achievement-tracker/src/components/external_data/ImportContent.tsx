import { Box } from "@mui/material"
import FileSelector from "./FileSelector"
import { useAchievements } from "../../context/AchievementContext";
import { useDialogContext } from "../../context/DialogContext";

const ImportContent = () => {
  const {addMultipleAchievements} = useAchievements();
  const {toggleImportExport} = useDialogContext();

  const processSubmit = async (data) => {
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
