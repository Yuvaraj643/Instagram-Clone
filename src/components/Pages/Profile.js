import React, { useEffect, useState, useContext } from "react";
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
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // console.log(state)
  useEffect(() => {
    fetch("https://instagram-83t5.onrender.com/my-posts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMyPosts(result.myposts);
        console.log(result);
        settotalPosts(result.myposts.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem("jwt");
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(`https://instagram-83t5.onrender.com/delete-post/${postId}`, {
        headers,
        timeout: 10000,
      });
      console.log("Post deleted:", response.data);
      toast.success(response.data.message);
      setMyPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error deleting post:", error);
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
          <div className="h-full">
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
                    {state ? state.name : ""}
                  </h2>
                  <div className="mx-auto flex align-center justify-between">
                    <Button color="primary">Edit Profile</Button>&nbsp;&nbsp;
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
                      <i
                        className="material-icons absolute top-2 right-2 z-10 red600 cursor-pointer"
                        onClick={() => deletePost(item._id)}
                      >
                        delete
                      </i>

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
          </div>
        </>
      )}
    </>
  );
}
