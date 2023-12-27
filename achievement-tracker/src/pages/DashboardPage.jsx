import AchievementTable from "../features/achievements/AchievementTable"
import Heading from "../ui/Heading"
import Row from "../styles/Row"

const DashboardPage = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <div>
          Placeholder
        </div>
      </Row>

      <AchievementTable/>
    </>
  )
}

export default DashboardPage
