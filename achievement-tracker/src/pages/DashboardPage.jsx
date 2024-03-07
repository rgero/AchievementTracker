import { useEffect, useState } from "react"

import AchievementTable from "../features/achievements/AchievementTable"
import AddAchievement from "../features/achievements/AddAchievement"
import Heading from "../ui/Heading"
import MobileOptions from "../ui/MobileOptions"
import Row from "../styles/Row"
import Search from "../ui/Search"
import { Sizes } from "../utils/constants"

const DashboardPage = () => {

  const [isDesktop, setDesktop] = useState(window.innerWidth > Sizes.minScreenSize);
  const updateMedia = () => {
    setDesktop(window.innerWidth > Sizes.minScreenSize);
  };
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        {isDesktop && (<Search/>)}
        <AddAchievement/>
      </Row>
      {!isDesktop && (<MobileOptions/>)}
      <Row>
        <AchievementTable/>
      </Row>
      
    </>
  )
}

export default DashboardPage
