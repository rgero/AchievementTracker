import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import styled from "styled-components"

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.2rem 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitle = styled.header`
  font-weight: bold
`

const StyledUser = styled.header`
  gap: 2.4rem;
  justify-content: flex-end;
  flex-direction: row;
  display:flex;
`


const Header = () => {
    return (
      <StyledHeader>
        <StyledTitle>
          The Achievement Tracker
        </StyledTitle>
        <StyledUser>
          <UserAvatar/>
          <HeaderMenu/>
        </StyledUser>
      </StyledHeader>
    )
}

export default Header
