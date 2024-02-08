import { useEffect, useState } from "react";

import Button from "../../styles/Button"
import CreateAchievementForm from "./CreateAchievementForm"
import Modal from "../../ui/Modal"
import { Sizes } from "../../constants/sizes";

const AddAchievement = () => {

  const [isDesktop, setDesktop] = useState(window.innerWidth > Sizes.minScreenSize);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 500);
  };

  let targetButton = <Button>Add New Achievement</Button>;
  if (!isDesktop)
  {
    targetButton = <Button size="medium">Add</Button>
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <Modal>
      <Modal.Open opens="achievement-form">
          {targetButton}
      </Modal.Open>
      <Modal.Window name="achievement-form">
          <CreateAchievementForm/>
      </Modal.Window>
    </Modal>
  )
}

export default AddAchievement
