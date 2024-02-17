import { useEffect, useState } from "react"

import AchievementTable from "../features/achievements/AchievementTable"
import AchievementTableOperations from "../features/achievements/AcheivementTableOperations"
import AddAchievement from "../features/achievements/AddAchievement"
import Heading from "../ui/Heading"
import Row from "../styles/Row"
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
        {isDesktop && (
          <AchievementTableOperations/>
        )}
        <AddAchievement/>
      </Row>
      {!isDesktop && (
        <Row>
          <AchievementTableOperations/>
        </Row>
      )}
      <Row>
        <AchievementTable/>
      </Row>
      
    </>
  )
}

export default DashboardPage
