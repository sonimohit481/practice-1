import React from "react";
import { Sidebar } from "../components/Sidebar";
import UserProfile from "../components/UserProfile";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { userQuery } from "../util/data";
import Pins from "./Pins";
import { client } from "../client";
import logo from "../assets/logo.png";
import { useState } from "react";
import { fetchUser } from "../util/fetchUser";
const Home = () => {
  const [toggleSideBar, setToggleSideBar] = React.useState(true);
  const [user, setUser] = useState(null);
  const scrollRef = React.useRef(null);
  const userInfo = fetchUser();

  React.useEffect(() => {
    // for sending backend data
    const query = userQuery(userInfo?.sub);
    // console.log(query);
    client.fetch(query).then((data) => setUser(data[0]));
  }, []);
  // ------
  React.useEffect(() => {
    // for setting scroll from 0
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className=" flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out ">
      {/* for displaying only on small screen and hidden on all other screen */}
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden ">
        <div className="flex flex-row justify-between items-center p-2 w-full shadow-md bg-slate-50">
          <HiMenu
            fontSize={40}
            className=" cursor-pointer"
            onClick={() => setToggleSideBar(true)}
          />
          <Link to={"/"}>
            <img src={logo} alt="logo" className=" w-28" />
          </Link>
          {/* getting this user from local storage */}
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className=" w-9" />
          </Link>
        </div>
        {toggleSideBar && (
          <div className="fixed w-3/5 bg-white h-screen overflow-y-auto animate-slide-in z-10 shadow-md">
            <div className="absolute flex justify-end w-full items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className=" cursor-pointer"
                onClick={() => setToggleSideBar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSideBar} />
          </div>
        )}
      </div>
      <div className="p-2 h-screen overflow-y-scroll flex-1 " ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
