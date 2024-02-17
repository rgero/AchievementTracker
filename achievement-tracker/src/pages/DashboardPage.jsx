import AchievementTable from "../features/achievements/AchievementTable"
import AchievementTableOperations from "../features/achievements/AcheivementTableOperations"
import AddAchievement from "../features/achievements/AddAchievement"
import Heading from "../ui/Heading"
import Row from "../styles/Row"

const DashboardPage = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <AddAchievement/>
      </Row>
      <Row>
        <AchievementTableOperations/>
      </Row>
      <Row>
        <AchievementTable/>
      </Row>
      
    </>
  )
}

export default DashboardPage
