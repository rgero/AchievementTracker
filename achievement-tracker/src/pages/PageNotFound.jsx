import styled from "styled-components";

const StyledPageNotFound = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageNotFound = () => {
  return (
      <StyledPageNotFound>
          Page has not been found fool.
      </StyledPageNotFound>
  )
}

export default PageNotFound
