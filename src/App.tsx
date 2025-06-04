import "./App.css";
import { MainLayout } from "./components/templates";
import { Home } from "./pages";

function App() {
  return (
    <>
      <MainLayout>
        <Home />
      </MainLayout>
    </>
  );
}

export default App;
