import { BrowserRouter } from "react-router-dom";
import AppBarComponent from "./components/AppBar";
import RoutesApp from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AppBarComponent />
      <RoutesApp />
    </BrowserRouter>
  );
}

export default App;
