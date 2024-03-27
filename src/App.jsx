import { AppRouter } from "./Components/AppRouter/AppRouter"
import { Footer } from "./Components/Footer/Footer"
import { Grid } from "./Components/Grid/Grid"
import { Header } from "./Components/Header/Header"
import { Main } from "./Components/Main/Main"
import { NavBar } from "./Components/NavBar/NavBar"
import { ContainerStyle } from "./Styled/Container.style"

const App = () => {
  return (
    <>
      <ContainerStyle $maxwidth="1024">
        <Grid>
          <Header area="header" />
          <NavBar area="navbar" />
          <Main area="main">
            <AppRouter />
          </Main>
          <Footer area="footer" />
        </Grid>
      </ContainerStyle>
    </>
  )
}

export default App
