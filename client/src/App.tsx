import { Outlet } from "react-router-dom";

//Pages
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
