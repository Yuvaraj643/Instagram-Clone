import React, { useState, useEffect, useContext } from "react";
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

export default function Topbar() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const renderList = () => {
    if (state) {
      return [
        <NavbarItem>
          <Button onPress={onOpen}>
            <BsFillPlusSquareFill className="w-6 h-6" />
          </Button>
        </NavbarItem>,
        <NavbarItem>
          <Button as={Link} to="/profile" color="warning" variant="flat">
            Profile
          </Button>
        </NavbarItem>,
         <NavbarItem>
         <Button  color="danger" variant="flat"
         onClick={
           () => {
             localStorage.clear();
             dispatch({type:"CLEAR"})
             navigate("/login");
             
           }
         }>
           Logout
         </Button>
       </NavbarItem>
      ];
    } else {
      return [
        <NavbarItem>
          <Button as={Link} to="/login" color="warning" variant="flat">
            Sign In
          </Button>
        </NavbarItem>,
        <NavbarItem>
          <Button as={Link} to="/signup" color="warning" variant="flat">
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
      fetch("/create-post", {
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
            <Link to={state?"/":"/login"}>
              <img src={logo} alt="logo" width="150px" />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Link to={"/"}>
              <img src={logo} alt="logo" width="150px" />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">{renderList()}</NavbarContent>
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
