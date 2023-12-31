import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  useDisclosure,
  Divider,
  Button,
  Avatar,
} from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";
import Loader from "../Loader/Loader";
import { Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { API_URL } from "../../App";
import { useParams } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
export default function Home() {
  const [data, setData] = useState([]);
  const [liked, setLiked] = React.useState(false);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showfollow, setShowfollow] = useState(true);
  const [followerscount, setfollowers] = useState([]);
  const [userProfile, setProfile] = useState(null);
  const { userid } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/all-posts`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const reversedData = [...data].reverse();

  const likePost = (id) => {
    fetch(`${API_URL}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch(`${API_URL}/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };



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
  const makeComment = (text, postId) => {
    fetch(`${API_URL}/comment`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        console.log(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="flex flex-col items-center ">
          {reversedData.map((item) => {
            return (
              <Card className="py-4 lg:w-1/3 my-2" key={item._id}>
                <CardHeader className="pb-0 pt-2 px-6 flex items-start">
                  <Avatar
                    alt="profilepic"
                    size = "lg"
                    src={item.postedBy.pic}
                  />
                  <div className="ml-4">
                    <Link to={`/profile/${item.postedBy._id}`}>
                      <p className="text-lg uppercase font-bold">
                        {item.postedBy.name}
                      </p>
                    </Link>
                  </div>
                  {/* {showfollow ? (
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
                          )} */}
                </CardHeader>
                <CardBody className="py-2 flex items-center justify-center">
                  <Image
                    alt="Card background"
                    className="rounded-2xl object-center max-h-96 overflow-hidden"
                    src={item.photo}
                    width={400}
                  />
                </CardBody>
                <hr></hr>
                <div className="flex flex-col pl-6 py-2">
                  {item.likes.includes(state._id) ? (
                    <i
                      className="large material-icons cursor-pointer hover:text-red-700"
                      style={{ color: "red" }}
                      onClick={() => unlikePost(item._id)}
                    >
                      favorite
                    </i>
                  ) : (
                    <i
                      className="large material-icons cursor-pointer hover:text-red-700"
                      style={{ color: "red" }}
                      onClick={() => likePost(item._id)}
                    >
                      favorite_border
                    </i>
                  )}
                  <span>{item.likes.length} likes</span>
                  <p className="text-default-500">{item.body}</p>
                  {item.comments.map((comment) => {
                    return (
                      <p key={comment._id}>
                        <span style={{ fontWeight: "bold" }} className="pr-2">
                          {comment.postedBy.name}
                        </span>
                        {comment.text}
                        {/* <i
                          className="material-icons red600 cursor-pointer absolute right-2"
                          onClick={onOpen}
                        >
                          delete
                        </i> */}
                        <Modal
                          isOpen={isOpen}
                          placement={"center"}
                          onOpenChange={onOpenChange}
                        >
                          <ModalContent>
                            {(onClose) => (
                              <>
                                <ModalHeader className="flex flex-col gap-1">
                                  Delete Post
                                </ModalHeader>
                                <ModalBody>
                                  Are you sure you want to delete this comment?
                                </ModalBody>
                                <ModalFooter>
                                  <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                    // onClick={() => deletePost(item._id)}
                                  >
                                    Yes
                                  </Button>
                                  <Button color="primary" onPress={onClose}>
                                    No
                                  </Button>
                                </ModalFooter>
                              </>
                            )}
                          </ModalContent>
                        </Modal>
                      </p>
                    );
                  })}
                </div>
                <form
                  className="pl-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                  }}
                >
                  <Input
                    className="p-0 m-0"
                    type="text"
                    labelPlacement="outside"
                    placeholder="Enter your comment"
                  />
                </form>
              </Card>
            );
          })}
        </section>
      )}
    </>
  );
}
