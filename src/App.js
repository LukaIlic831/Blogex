import Dashboard from "./pages/dashboard";
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Search from "./pages/search";
import Login from "./pages/login";
import Register from "./pages/register";
import Createblog from "./pages/createblog";
import Myblogs from "./pages/myblogs";


function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/searchblogs" element={<Search/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/createblog" element={<Createblog/>}></Route>
        <Route path="/myblogs" element={<Myblogs/>}></Route>
      </Routes>
     </Router>
    </>
  );
}

export default App;
