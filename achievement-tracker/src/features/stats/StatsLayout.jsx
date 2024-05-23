/* eslint-disable no-unused-vars */

import { Sizes } from '../../utils/constants';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import WeightChart from './WeightChart';
import styled from "styled-components";
import { useStatsAchievements } from './hooks/useStatsAchievements';

const StyledStatsLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media(max-width: ${Sizes.minStatsSize}px) {
    grid-template-columns: 1fr; // Switch to a single column
  }
`;


const StatsLayout = () => {
  const {achievements, isLoading} = useStatsAchievements();
  
  if (isLoading) return <Spinner/>

  return (
    <StyledStatsLayout>
      <Stats achievements={achievements}/>
      <WeightChart achievements={achievements}/>
    </StyledStatsLayout>
  )
}

export default StatsLayout
