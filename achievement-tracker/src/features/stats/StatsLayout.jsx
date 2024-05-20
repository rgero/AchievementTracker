/* eslint-disable no-unused-vars */

import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import styled from "styled-components";
import { useStatsAchievements } from './hooks/useStatsAchievements';

const StyledStatsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


const StatsLayout = () => {
  const {achievements, isLoading} = useStatsAchievements();
  
  if (isLoading) return <Spinner/>

  return (
    <StyledStatsLayout>
      <Stats achievements={achievements}/>
    </StyledStatsLayout>
  )
}

export default StatsLayout
