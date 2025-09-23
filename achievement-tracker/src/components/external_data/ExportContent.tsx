import { Box, Button } from "@mui/material";

import { useAchievementsContext } from "../../context/achievement/AchievementContext";

;

const ExportContent = () => {
  const { achievements } = useAchievementsContext(); // assumes `achievements` is accessible

  const handleExport = () => {
    const json = JSON.stringify(achievements, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "achievements_export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", pt: 5, minHeight: "250px" }}>
      <Button variant="contained" color="primary" onClick={handleExport}>
        Export Achievements
      </Button>
    </Box>
  );
};

export default ExportContent;
