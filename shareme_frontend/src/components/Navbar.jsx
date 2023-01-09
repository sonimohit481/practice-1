import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch, IoMdAdd } from "react-icons/io";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  // console.log(user);
  const navigate = useNavigate();
  if (!user) return null;
  return (
    <div className="flex gap-2 md:gap-5 mt-5 w-fill">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className=" ml-1" />
        <input
          type={"text"}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/${user._id}`} className="hidden md:block">
          <img src={user.image} alt="logo" className="w-14 h-11 rounded" />
        </Link>
        <Link
          to="create-pin"
          className="bg-black rounded-lg text-white w-12 h-12 md:w-12 md:h-11 flex justify-center items-center"
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
