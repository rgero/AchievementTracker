import { Feedback } from "@mui/icons-material";
import HeaderMenuOption from "./HeaderMenuOption";
import { useDialogContext } from "../../../context/DialogContext";

const FeedbackOption = () => {
  const {toggleFeedback} = useDialogContext();
  return (
    <HeaderMenuOption icon={<Feedback/>} text="Feedback" onClick={toggleFeedback}/>
  )
}

export default FeedbackOption
