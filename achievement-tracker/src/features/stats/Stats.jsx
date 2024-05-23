/* eslint-disable react/prop-types */

import { GrAchievement } from "react-icons/gr";
import Heading from "../../ui/Heading";
import Stat from "./Stat"
import styled from "styled-components";

const StatsBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const Stats = ({achievements = []}) => {
  const numAchievements = achievements.length;

  const separatedLists = achievements.reduce((acc, obj) => {
    let key = obj.weight;
    if (key == 1) { key = "low" }
    if (key == 2) { key = "medium" }
    if (key == 3) { key = "high" }
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  return (
    <StatsBox>
      <Heading as="h2">Priority Breakdown</Heading>
      <Stat title="Total" color="blue" icon={<GrAchievement/>} value={numAchievements}/>
      <Stat title="Low" icon={<GrAchievement/>} value={separatedLists.low.length}/>
      <Stat title="Medium" icon={<GrAchievement/>} value={separatedLists.medium.length}/>
      <Stat title="High" icon={<GrAchievement/>} value={separatedLists.medium.length}/>
    </StatsBox>
  )
}

export default Stats
