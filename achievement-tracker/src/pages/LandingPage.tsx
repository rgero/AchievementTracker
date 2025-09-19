import { Button, Card, CardContent, Grid, Theme, Typography, useTheme } from "@mui/material";

import { useAuth } from "../context/AuthenticationContext";
import { useEffect } from "react";

const LandingPage = () => {
  const theme: Theme = useTheme();
  const {loginWithGoogle} = useAuth();

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
    <Grid
      container
      sx={{ 
        height: "100vh"
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Card sx={{padding: "10px"}}>
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid>
              <Typography variant="h5">The Achievement Tracker</Typography>
            </Grid>
            <Grid alignItems="center">
              <Typography variant="body1">Welcome to the Achievement Tracker.</Typography>
              <Typography>A website meant for you to easily remember your accomplishments.</Typography>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={loginWithGoogle}>Login</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LandingPage;
