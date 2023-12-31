import Button from "../styles/Button";
import Heading from "../ui/Heading"
import LoginForm from "../features/authentication/LoginForm";
import styled from "styled-components";
import { useGoogleLogin } from "../features/authentication/hooks/useGoogleLogin";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const Login = () => {
  const {login, isLoading} = useGoogleLogin();
  return (
    <LoginLayout>
        <Heading as='h4'>Log into your account</Heading>
        <LoginForm/>
        <Button disabled={isLoading} onClick={login}>
          Log in with Google
        </Button>
    </LoginLayout>
  )
}

export default Login
