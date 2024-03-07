import AchievementTableOperations from "../features/achievements/AcheivementTableOperations"
import Button from "../styles/Button"
import Row from "../styles/Row"
import Search from "./Search"
import { useCollapse } from "react-collapsed"

const MobileOptions = () => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <Row>
      <Button {...getToggleProps()}>{isExpanded ? "Hide Options" : "Show Options"}</Button>
      <div {...getCollapseProps()}>
        <Row>
          <Search/>
          <AchievementTableOperations/>
        </Row>
      </div>
    </Row>
  )
}

export default MobileOptions
