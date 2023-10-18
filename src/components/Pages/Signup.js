import React, { useState, useEffect } from "react";
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
import Loader from "../Loader/Loader";
import { API_URL } from "../../App";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    if(url){
      uploadFields();
    }
  },[url]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const uploadProfilePic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dxeplm6kp");
    fetch("https://api.cloudinary.com/v1_1/dxeplm6kp/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
      setLoading(false);
  };
  const uploadFields =()=>{
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("Invalid Email");
      return;
    }
    fetch(`${API_URL}/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url,
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
  }

  const PostData = () => {
    if(image){
      uploadProfilePic();
    }else{
      uploadFields();
    }
    
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
                  label="Username"
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
                <Card className="max-w-[400px]">
                  <CardHeader className="flex gap-3">
                      <p className="text-md">Upload Profile Picture</p>
                  </CardHeader>
                  <Divider />
                  <CardFooter>
                  <div className="mb-3 w-96">
                      <input
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        type="file"
                        id="formFile"
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                  </CardFooter>
                </Card>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button
                  color="primary"
                  variant="shadow"
                  onClick={() => PostData()}
                >
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
      )}
    </>
  );
}
