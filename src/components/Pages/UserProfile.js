import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import settings from "./assets/settings.png";
import Loader from "../Loader/Loader";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import axios from "axios";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [myposts, setMyPosts] = useState([]);
  const [totalPosts, settotalPosts] = useState([]);
  const [username, setUsername] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { userid } = useParams();
  console.log(userid);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetch(`https://instagram-83t5.onrender.com/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMyPosts(result.posts);
        settotalPosts(result.posts.length);
        setUsername(result.user.name);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
          <div className="h-full">
            {myposts.map((item) => {
              return (
                <>
                  <section className="w-1/2 mx-auto my-4">
                    <div className="flex flex-col items-center justify-evenly sm:flex-row sm:items-start">
                      <div className="mb-4 sm:mb-0">
                        <Avatar
                          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                          className="w-40 h-40 text-large"
                        />
                      </div>
                      <div className=" flex flex-col justify-center text-center sm:text-left ">
                        <h2 className="text-2xl text-center my-2">
                          {username}
                        </h2>
                        <div className="mx-auto flex align-center justify-between">
                          <Button color="primary">Edit Profile</Button>
                          &nbsp;&nbsp;
                          <img src={settings} alt="settings" className="h-8" />
                        </div>
                        <div className="flex gap-8 pl-4 font-semibold my-4">
                          <div className="flex flex-col text-center">
                            <span>{totalPosts}</span>
                            <p className="text-base">Posts</p>
                          </div>
                          <div className="flex flex-col text-center">
                            <span>100</span>
                            <p className="text-base">Followers</p>
                          </div>
                          <div className="flex flex-col text-center">
                            <span>100</span>
                            <p className="text-base">Following</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                  </section>
                  <section className="lg:w-full lg:flex-row lg:justify-center">
                    <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 mx-auto">
                      {myposts.map((item) => {
                        return (
                          <Card
                            className="col-span-12 sm:col-span-4 h-[300px]"
                            key={item._id}
                          >
                            <Image
                              removeWrapper
                              alt="Card background"
                              className="z-0 w-full h-full object-cover"
                              src={item.photo}
                            />
                          </Card>
                        );
                      })}
                    </div>
                  </section>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
