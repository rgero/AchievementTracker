import AchievementTable from "../features/achievements/AchievementTable"
import AddAchievement from "../features/achievements/AddAchievement"
import Heading from "../ui/Heading"
import Row from "../styles/Row"

const DashboardPage = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <div>
          <AddAchievement/>
        </div>
      </Row>

      <Row>
        <AchievementTable/>
      </Row>
      
    </>
  )
}

export default DashboardPage
