import Button from "../styles/Button";
import Heading from "../ui/Heading"
import SignupForm from "../features/authentication/SignupForm"
import styled from "styled-components";
import { useGoogleLogin } from "../features/authentication/hooks/useGoogleLogin";

const SignUpLayout = styled.main`
  min-height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 768px) {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 60rem;
    align-content: center;
    justify-content: center;
    gap: 3.2rem;
    
  }
`;

const SignUpPage = () => {
  const {login, isLoading} = useGoogleLogin();
  return (
      <SignUpLayout>
          <Heading as="h1">Create a new account</Heading>
          <SignupForm/>
          <Button disabled={isLoading} onClick={login}>
            Create Account with Google
          </Button>
      </SignUpLayout>
  )
}

export default SignUpPage
