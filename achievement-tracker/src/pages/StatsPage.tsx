import { Container, Grid2 as Grid, Typography } from "@mui/material"

import StatsByWeight from "../components/stats/StatsByWeight"
import StatsSortedByYears from "../components/stats/StatsSortedByYears"

const StatsPage = () => {
  return (
    <Container>
      <Typography variant="h4">Stats</Typography>
      <Grid container direction="row">
        <Grid>
          <StatsSortedByYears/>
        </Grid>
        <Grid>
          <StatsByWeight/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default StatsPage
