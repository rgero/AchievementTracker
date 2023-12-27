import Heading from "../ui/Heading"
import SignupForm from "../features/authentication/SignupForm"
import styled from "styled-components";

const SignUpLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 60rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const SignUpPage = () => {
    return (
        <SignUpLayout>
            <Heading as="h1">Create a new account</Heading>
            <SignupForm/>
        </SignUpLayout>
    )
}

export default SignUpPage
