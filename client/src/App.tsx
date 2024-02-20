import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import MyPlaylists from "./pages/MyPlaylists";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/playlists' element={<MyPlaylists />} />
      </Routes>
    </Router>
  );
}

export default App;
