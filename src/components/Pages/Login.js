import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";

export default function Login() {
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  })

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("Invalid Email");
      return;
    }
    fetch("https://instagram-83t5.onrender.com/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          toast.success("Successfully signed in");
          setTimeout(function () {
            navigate("/");
          }, 3000);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <>
    {loading ? (
        <Loader />
      ) : (
        <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="flex justify-center items-center h-screen">
        <Card className="min-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">Login</p>
              <p className="text-small text-default-500">
                Explore Instagram🤩😃
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Input
              type="email"
              variant={"bordered"}
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardBody>
          <CardBody>
            <Input
              type="password"
              variant={"bordered"}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardBody>
          <Divider />
          <CardFooter>
            <Button color="primary" variant="shadow" onClick={() => PostData()}>
              Login
            </Button>
            <CardBody>
              <p className="flex justify-evenly">
                Don't have an account?
                <Link to={"/signup"}>
                  <span className="text-blue-500">Signup</span>
                </Link>
              </p>
            </CardBody>
          </CardFooter>
        </Card>
      </div>
      </>
      )}  
    </>
  );
}
