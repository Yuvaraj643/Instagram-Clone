import React, { useState, useEffect, useContext } from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./DarkMode/MoonIcon";
import { SunIcon } from "./DarkMode/SunIcon";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Button,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import logo from "../Pages/assets/logo.png";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Input } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { User } from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import "./topbar.css";

export default function Topbar() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const darkMode = useDarkMode(false);

  //darkmode
  const [isDarkMode, setIsDarkMode] = useState(true); // Assuming dark mode is enabled by default

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    
    if (isDarkMode) {
      darkMode.disable();
    } else {
      darkMode.enable();
    }
  };


  const renderList = () => {
    if (state) {
      return [
        <NavbarItem>
          <Button isIconOnly onClick={onOpen} variant="faded">
            <BsFillPlusSquareFill className="w-6 h-6" />
          </Button>
        </NavbarItem>,
        <NavbarItem>
          <Button as={Link} to="/profile" color="success">
            Profile
          </Button>
        </NavbarItem>,
        <NavbarItem>
          <Button
            color="danger"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </NavbarItem>,
      ];
    } else {
      return [
        <NavbarItem>
          <Button as={Link} to="/login" color="primary" className="text-white">
            Sign In
          </Button>
        </NavbarItem>,
        <NavbarItem>
          <Button as={Link} to="/signup" color="primary" className="text-white">
            Sign Up
          </Button>
        </NavbarItem>,
      ];
    }
  };

  //addpost
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      fetch("https://instagram-83t5.onrender.com/create-post", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success("Post created successfully");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
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
  };

  return (
    <>
      <Navbar disableAnimation isBordered>
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Link
              to={state ? "/" : "https://instagram-83t5.onrender.com/login"}
            >
              <p className="logo-title  text-foreground bg-background text-2xl font-bold">
                Instagram
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Link
              to={state ? "/" : "https://instagram-83t5.onrender.com/login"}
            >
              <p className="logo-title text-foreground bg-background text-4xl font-bold">
                Instagram
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">{renderList()}</NavbarContent>
        <Switch
          defaultSelected={isDarkMode}
          size="lg"
          color="success"
          startContent={<SunIcon />}
          endContent={<MoonIcon />}
          onChange={toggleDarkMode}
        >
          {/* {isDarkMode ? "Dark mode" : "Light mode"} */}
        </Switch>
      </Navbar>
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
      {/* //create-post */}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Post
              </ModalHeader>
              <ModalBody>
                <Card className="max-w-[400px]">
                  <Divider />
                  <CardBody>
                    <Input
                      type="email"
                      label="Title of Post"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                      type="email"
                      label="Description"
                      onChange={(e) => setBody(e.target.value)}
                      className="my-4"
                    />
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <div className="mb-3 w-96">
                      <input
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        type="file"
                        id="formFile"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                  </CardFooter>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={() => postDetails()}
                >
                  Share
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
