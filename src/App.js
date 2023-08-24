import React, { useEffect, createContext, useReducer, useContext } from "react";
import Topbar from "./components/Navbar/Topbar";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import Profile from "./components/Pages/Profile";
import { reducer, initialState } from "./reducers/userReducer";


export const UserContext = createContext();
const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Topbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
};

export default App;
