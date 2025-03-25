import { Button, Container, Typography } from "@mui/material"

import { useAuth } from "../context/AuthenticationContext"

const DashboardPage = () => {
  const {logout} = useAuth();
  return (
    <Container>
      <Typography>Dashboard Page</Typography>
      <Button variant="contained" onClick={logout}>Logout</Button>
    </Container>
  )
}

export default DashboardPage
