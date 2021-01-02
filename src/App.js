import styled, { ThemeProvider } from 'styled-components';

import { COLORS, SIZES } from './Shared/styles';
import GlobalStyles from './Shared/GlobalStyles';

import List from "./containers/List";
import StoreProvider from "./containers/List/stores/StoreProvider";
import Header from './containers/Header.js';
import Footer from './containers/Footer';

const App = () => {

  return (
    <ThemeProvider theme={{colors: COLORS, sizes: SIZES}}>
      <StoreProvider>
      <GlobalStyles />
      <StyledWrapper>
        <Header />
        <StyledMain>
          <List />
        </StyledMain>
        <Footer />
      </StyledWrapper>
      </StoreProvider>
    </ThemeProvider>
  );
};

export default App;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

`;

const StyledMain = styled.main`
  flex-grow: 1;
  padding: 1vmax;
`;