import List from "./containers/List/List"
import StoreProvider from "./containers/List/stores/StoreProvider";

const App = () => {

  return (
    <StoreProvider>
      <div>
        <List />
      </div>
    </StoreProvider>
  );
};

export default App;
