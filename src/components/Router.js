import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Works from "routes/Works";
import Write from "routes/Write";
import About from "routes/About";
import Nav from "./Nav";
import Edit from "routes/Edit";
import WriteEdit from "routes/WriteEdit";

const AppRouter = ({ isLoggedIn, user }) => {
  return (
    <Router>
      <Nav isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Works />} />
        <Route path="/about" element={<About />} />
        {isLoggedIn ? (
          <>
            <Route path="/write" element={<Write user={user} />} />
            <Route path="/write-edit" element={<WriteEdit user={user} />} />
            <Route
              path="/write-edit/:id"
              element={<WriteEdit user={user} />}
            ></Route>
            <Route path="/edit" element={<Edit user={user} />} />
          </>
        ) : (
          <Route path="/login" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
