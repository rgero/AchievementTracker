import { Container, Dialog, Typography } from "@mui/material"

import FeedbackForm from "./FeedbackForm"
import { useDialogContext } from "../../context/dialog/DialogContext";

const FeedbackDialog = () => {
  const {feedbackOpen, toggleFeedback} = useDialogContext();
  return (
    <Dialog open={feedbackOpen} onClose={toggleFeedback} fullWidth={true}>
      <Container sx={{paddingY: "20px"}}>
        <Typography variant="h5" gutterBottom>We value your feedback!</Typography>
        <FeedbackForm/>
      </Container>
    </Dialog>
  )
}

export default FeedbackDialog
