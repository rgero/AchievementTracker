import { NavLink } from "react-router-dom";
import { Sizes } from "../constants/sizes";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    
    color: var(--color-grey-600);
    font-size: 2.0rem;
    font-weight: 700;
    transition: all 0.3s;

    @media only screen and (min-width: ${Sizes.minScreenSize}px)
    {
      font-size: 2.5rem;
    }
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const Title = ({children}) => {
  return (
    <StyledNavLink to='/dashboard'>
      {children}
    </StyledNavLink>
  )
}

export default Title
