import Header from "./Header"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;

  @media only screen and (mid-width: 768px)
  {
    height: 100vh;
  }
  
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`

const AppLayout = () => {
    return (
        <StyledAppLayout>
            <Header/>
            <Main>
                <Container>
                  <Outlet/>
                </Container>
            </Main>
        </StyledAppLayout>
    )
}

export default AppLayout
