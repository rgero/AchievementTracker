import Button from "../styles/Button";
import Card from "../ui/Card";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"

const StyledLandingPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin: 1rem;
`

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <StyledLandingPage>
      <Card>
        <Card.Header>The Achievement Tracker</Card.Header>
        <Card.Body>
          Welcome to the Achievement Tracker. <br/>A website meant for you to easily remember your accomplishements.
        </Card.Body>
        <Card.Footer>
          <StyledButton onClick={()=> navigate('/signup')}>Create new account</StyledButton>
          <StyledButton onClick={()=> navigate('/login')}>Login</StyledButton>
        </Card.Footer>
      </Card>

    </StyledLandingPage>
  )
}

export default LandingPage
