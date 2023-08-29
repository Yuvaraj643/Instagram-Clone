import React from "react";
import "./found.css";
import logo from "../Pages/assets/logo.png";

const NotFound = () => {
  return (
    <>
      <div className="bg-purple">
        <div className="stars">
          <div className="custom-navbar">
            <div className="brand-logo"></div>
          </div>
          <div className="central-body">
            <div>
              <img
                className="image-404"
                src="http://salehriaz.com/404Page/img/404.svg"
                width="300px"
              />
              <a href="/" className="btn-go-home">
                GO BACK HOME
              </a>
            </div>
          </div>
          <div className="objects">
            <img
              className="object_rocket"
              src="http://salehriaz.com/404Page/img/rocket.svg"
              width="40px"
            />
            <div className="earth-moon">
              <img
                className="object_earth"
                src="http://salehriaz.com/404Page/img/earth.svg"
                width="100px"
              />
              <img
                className="object_moon"
                src="http://salehriaz.com/404Page/img/moon.svg"
                width="80px"
              />
            </div>
            <div className="box_astronaut">
              <img
                className="object_astronaut"
                src="http://salehriaz.com/404Page/img/astronaut.svg"
                width="140px"
              />
            </div>
          </div>
          <div className="glowing_stars">
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
