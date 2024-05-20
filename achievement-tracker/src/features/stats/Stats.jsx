/* eslint-disable react/prop-types */

import { GrAchievement } from "react-icons/gr";
import Stat from "./Stat"

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
    <>
      <Stat title="Total" color="blue" icon={<GrAchievement/>} value={numAchievements}/>
      <Stat title="Low" color="red" icon={<GrAchievement/>} value={separatedLists.low.length}/>
      <Stat title="Medium" color="yellow" icon={<GrAchievement/>} value={separatedLists.medium.length}/>
      <Stat title="High" color="green" icon={<GrAchievement/>} value={separatedLists.medium.length}/>
    </>
  )
}

export default Stats
