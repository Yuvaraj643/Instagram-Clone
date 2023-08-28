import React, {
  useState,
  useEffect,
  createContext,
  useReducer,
  useContext,
} from "react";
import Topbar from "./components/Navbar/Topbar";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import Profile from "./components/Pages/Profile";
import UserProfile from "./components/Pages/UserProfile";
import Loader from "./components/Loader/Loader";
import { reducer, initialState } from "./reducers/userReducer";
import NotFound from "./components/404/NotFound";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import 'react-dotenv';

export const UserContext = createContext();
const Routing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path='/profile/:userid' element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
    </>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setLoading] = useState(true);
  const darkMode = useDarkMode(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <main
            className= {`${
              darkMode.value ? "dark" : ""
            } text-foreground bg-background`}
          >
            <Topbar />
            {isLoading ? <Loader /> : <Routing />}
          </main>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
};

export default App;
