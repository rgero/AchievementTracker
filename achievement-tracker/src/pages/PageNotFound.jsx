import Button from "../styles/Button";
import Heading from "../ui/Heading";
import Row from "../styles/Row";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledPageNotFound = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledRow = styled(Row)`
  margin-top: 3rem;
`

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
      <StyledPageNotFound>
        <Heading as="h1">Page not found</Heading>
        <Row>
          The page you are looking for has not been found.
        </Row>
        <StyledRow>
          <Button onClick={()=> navigate("/")}>Click here to return</Button>
        </StyledRow>
      </StyledPageNotFound>
  )
}

export default PageNotFound
