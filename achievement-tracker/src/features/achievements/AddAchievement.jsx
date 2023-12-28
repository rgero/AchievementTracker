import Button from "../../styles/Button"
import CreateAchievementForm from "./CreateAchievementForm"
import Modal from "../../ui/Modal"

const AddAchievement = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="achievement-form">
            <Button>Add New Achievement</Button>
        </Modal.Open>
        <Modal.Window name="achievement-form">
            <CreateAchievementForm/>
        </Modal.Window>
      </Modal>
    </div>
  )
}

export default AddAchievement
