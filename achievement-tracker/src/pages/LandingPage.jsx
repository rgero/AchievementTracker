import styled from "styled-components";

const StyledLandingPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;


const LandingPage = () => {
  return (
    <StyledLandingPage>
      Welcome!
    </StyledLandingPage>
  )
}

export default LandingPage
