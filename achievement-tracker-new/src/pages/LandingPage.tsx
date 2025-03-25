import { Grid2 as Grid, Theme, Typography, useTheme } from "@mui/material";

import { useEffect } from "react";

const LandingPage = () => {
  const theme: Theme = useTheme();

  useEffect(() => {
    document.body.style.background = `url('/background.jpg') center/cover no-repeat fixed`;
    document.body.style.backgroundColor = theme.palette.background.paper;
    document.body.style.color = theme.palette.primary.light;

    return () => {
      document.body.style.background = "";
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, [theme]);

  return (
    <Grid container sx={{ height: "100vh", paddingTop: "2rem" }} direction="column" alignItems="center">
      <Grid>
        <Typography variant="h1">Welcome to the Achievement Tracker</Typography>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
