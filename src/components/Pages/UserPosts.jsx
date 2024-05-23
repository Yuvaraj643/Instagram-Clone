import React from "react";
import {
    Card,
    Image,
  } from "@nextui-org/react";


const UserPosts = (image,key) => {
  console.log(image);

  return (
    <>

          <Card className="col-span-12 sm:col-span-4 h-[300px]" key={key}>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-80 h-80 object-cover"
              src={image.image}
            />
          </Card>
    </>
  );
};

export default UserPosts;
