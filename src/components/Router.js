import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Works from "routes/Works";
import About from "routes/About";
import Nav from "./Nav";

const AppRouter = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Works />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
