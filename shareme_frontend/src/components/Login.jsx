import React from "react";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "google-login-react";
import { GoogleLogin } from "google-login-react";

import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response));
    const { name, picture, sub } = response;
    console.log(name, picture, sub);
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    // will create new user in sanity if not exits
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      {/* setting vedio background */}
      <div className="relative w-full h-full">
        <video
          // source
          src={shareVideo}
          // type
          type={"video.mp4"}
          // for infinity looping
          loop
          // sound mute
          muted
          // auto playingh
          autoPlay
          controls={false}
          // full-w-h cover whole page
          className="w-full h-full object-cover"
        />
        {/* over laying the vedio with back screen in cdenter */}
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay ">
          <div className="p-5">
            {/*  setting logo image */}
            <img src={logo} width={"350px"} alt={"logo"} />
          </div>
          <div className=" shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              onSuccess={responseGoogle}
              onError={responseGoogle}
              render={(renderProps) => (
                <button
                  type="button"
                  className=" bg-mainColor flex justify-center items-center p-3 rounded-2xl cursor-pointer bold"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className=" mr-4" />
                  Google Login
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
