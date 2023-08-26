import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";
import Loader from "../Loader/Loader";
export default function Home() {
  const [data, setData] = useState([]);
  const [liked, setLiked] = React.useState(false);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetch("https://instagram-83t5.onrender.com/all-posts", {
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
    fetch("https://instagram-83t5.onrender.com/like", {
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
    fetch("https://instagram-83t5.onrender.com/unlike", {
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
                  <Image
                    alt="nextui logo"
                    height={45}
                    radius="sm"
                    src="https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-6/128/profile-male-circle2-512.png"
                    width={45}
                  />
                  <div className="ml-4">
                    <p className="text-lg uppercase font-bold">
                      {item.postedBy.name}
                    </p>
                    <small className="text-default-500">{item.body}</small>
                  </div>
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
                <CardBody>
                  {item.likes.includes(state._id) ? (
                    <i
                      class="large material-icons cursor-pointer hover:text-red-700"
                      style={{ color: "red" }}
                      onClick={() => unlikePost(item._id)}
                    >
                      favorite
                    </i>
                  ) : (
                    <i
                      class="large material-icons cursor-pointer hover:text-red-700"
                      style={{ color: "red" }}
                      onClick={() => likePost(item._id)}
                    >
                      favorite_border
                    </i>
                  )}
                  <span>{item.likes.length} likes</span>
                </CardBody>
              </Card>
            );
          })}
        </section>
      )}
    </>
  );
}
