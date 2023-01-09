import React from "react";
import logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { categories } from "../util/data";
const isNotActiveStyle =
  "flex items-center px-5 gap-3 hover:text-black text-gray-500 transition-all  duration-200 ease-in-out capatalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all  duration-200 ease-in-out capatalize";
// const categories = [
//   { name: "Animals" },
//   { name: "Wallapapers" },
//   { name: "Photography" },
//   { name: "Gaming" },
//   { name: "Gaming" },
// ];
export const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className=" flex flex-col h-full min-w-210  bg-white overflow-y-scroll hide-scrollbar focus-within:shadow-md">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 pt-1 my-6 gap-2 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} className="w-full" alt="logo" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <AiFillHome />
            Home
          </NavLink>
          <h3 className="px-5 mt-2 text-base 2xl:text-xl">Discover category</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="lex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            alt="user-profile"
            className="w-10 h-10 rounded-full"
          />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};
