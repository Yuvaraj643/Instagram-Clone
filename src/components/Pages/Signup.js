import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("Invalid Email");
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          setTimeout(function () {
            navigate("/login");
          }, 5000);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
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
      <div className="flex justify-center items-center my-24">
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
              <p className="text-md">Signup</p>
              <p className="text-small text-default-500">
                Create your Instagram Account😍👍
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Input
              type="text"
              variant={"bordered"}
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </CardBody>
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
              Signup
            </Button>
            <CardBody>
              <p className="flex justify-evenly">
                Already have an account?
                <Link to={"/login"}>
                  <span className="text-blue-500">Login</span>
                </Link>
              </p>
            </CardBody>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
