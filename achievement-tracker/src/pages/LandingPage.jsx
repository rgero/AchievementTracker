import Button from "../styles/Button";
import Card from "../ui/Card";
import background from '../assets/background.jpg';
import styled from "styled-components";
import { useGoogleLogin } from "../features/authentication/hooks/useGoogleLogin";

const StyledLandingPage = styled.div`
  height: 100vh;
  background: url(${background});
  background-repeat: space;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LandingPage = () => {
  const {login, isLoading} = useGoogleLogin();
  return (
    <StyledLandingPage>
      <Card>
        <Card.Header>The Achievement Tracker</Card.Header>
        <Card.Body>
          Welcome to the Achievement Tracker. <br/>A website meant for you to easily remember your accomplishements.
        </Card.Body>
        <Card.Footer>
          <Button disabled={isLoading} onClick={login}>
            Log in with Google
          </Button>
        </Card.Footer>
      </Card>

    </StyledLandingPage>
  )
}

export default LandingPage
