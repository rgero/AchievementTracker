import Heading from "../ui/Heading"
import LoginForm from "../features/authentication/LoginForm";
import styled from "styled-components";

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
  return (
    <LoginLayout>
        <Heading as='h4'>Log into your account</Heading>
        <LoginForm/>
    </LoginLayout>
  )
}

export default Login
