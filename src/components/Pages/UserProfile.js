import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Chip,
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
import { API_URL } from "../../App";
export default function Profile() {
  const [userProfile, setProfile] = useState(null);
  const [myposts, setMyPosts] = useState([]);
  const [totalPosts, settotalPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [followerscount, setfollowers] = useState([]);
  const [followingcount, setfollowing] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  // const [showfollow, setShowfollow] = useState(
  //   state ? !state.updatedUser.followers.includes(userid) : false
  // );
  const [showfollow, setShowfollow] = useState(false);
  const [profilepic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(true);
  const { userid } = useParams();
  // console.log(userid);
  console.log(state);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
        console.log(result);
        console.log(userProfile);
        setMyPosts(result.posts);
        setProfilePic(result.user.pic);
        settotalPosts(result.posts.length);
        setUsername(result.user.name);
        setfollowers(result.user.followers.length);
        setfollowing(result.user.following.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const followUser = () => {
    fetch(`${API_URL}/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setfollowers(data.updatedUser.followers.length);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowfollow(false);
      });
  };

  const unfollowUser = () => {
    fetch(`${API_URL}/unfollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setfollowers(data.updatedFollowedUser.followers.length);
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowfollow(true);
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
          <div className="h-full">
            {myposts.map((item) => {
              return (
                <>
                  <section className="w-1/2 mx-auto my-4">
                    <div className="flex flex-col items-center justify-evenly sm:flex-row sm:items-start">
                      <div className="mb-4 sm:mb-0">
                        <Avatar
                          src={profilepic}
                          className="w-40 h-40 text-large"
                        />
                      </div>
                      <div className=" flex flex-col justify-center text-center sm:text-left ">
                        <div className="flex justify-center gap-2">
                          <h2 className="text-2xl text-center my-2">
                            {username}
                          </h2>
                          {showfollow ? (
                            <Button
                              className="my-1.5"
                              color="primary"
                              size="sm"
                              variant="shadow"
                              onClick={() => followUser()}
                            >
                              Follow
                            </Button>
                          ) : (
                            <Button
                              className="my-1.5"
                              color="primary"
                              size="sm"
                              variant="shadow"
                              onClick={() => unfollowUser()}
                            >
                              Unfollow
                            </Button>
                          )}
                        </div>

                        <div className="mx-auto flex align-center justify-between">
                          <Button color="primary">Edit Profile</Button>

                          <img src={settings} alt="settings" className="h-8" />
                        </div>
                        <div className="flex gap-8 pl-4 font-semibold my-4">
                          <div className="flex flex-col text-center">
                            <span>{totalPosts}</span>
                            <p className="text-base">Posts</p>
                          </div>
                          <div className="flex flex-col text-center">
                            <span>{followerscount}</span>
                            <p className="text-base">Followers</p>
                          </div>
                          <div className="flex flex-col text-center">
                            <span>{followingcount}</span>
                            <p className="text-base">Following</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                  </section>
                  <section className="lg:w-full lg:flex-row lg:justify-center">
                    <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 mx-auto">
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
