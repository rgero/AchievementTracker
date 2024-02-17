import Heading from "./Heading"
import { Sizes } from "../utils/constants";
import styled from "styled-components"

const StyledCard = styled.div`
  display:flex;
  flex-direction: column;
  background-color: var(--color-silver-100);
  width: 40%;
  height: 40%;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: ${Sizes.minScreenSize}px){
    width: 80%;
  }

  @media (min-width: ${Sizes.minScreenSize}px){
    width: 40%;
    height: 40%;
  }
`

const StyledHeader = styled.header`
  margin: 1.6rem 2.4rem;
  width: 90%;
  border-bottom: 1px solid;
  border-color: black;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledFooter = styled.footer`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 1.2rem;
  margin: 1rem;
`;

const StyledBody = styled.div`
  padding-top: 2.4rem;
`

const Card = ({children}) => {
  return (
    <StyledCard>
      {children}
    </StyledCard>
  )
}

const Header = ({children}) => {
  return (
    <StyledHeader>
      <Heading as="h1">
          {children}
      </Heading>
    </StyledHeader>
  )
}

const Footer = ({children}) =>
{
  return (
    <StyledFooter>
      {children}
    </StyledFooter>
  )
}

const Body = ({children}) => {
  return (
    <StyledBody>
      {children}
    </StyledBody>
  )
}

Card.Header = Header;
Card.Footer = Footer;
Card.Body = Body;

export default Card
