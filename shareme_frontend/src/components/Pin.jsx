import React, { useState, useEffect } from "react";
import { urlFor, client } from "../client";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../util/fetchUser";

const Pin = ({ pin }) => {
  // console.log(pin.postedBy.image);
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();
  const user = fetchUser();
  const alreadySaved = !!pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.sub
  )?.length;
  const savePin = (id) => {
    setSavingPost(true);
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.sub,
            postedBy: {
              _type: "postedBy",
              _ref: user?.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };
  // for eletinf pin
  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };
  //   we are trying to get
  // 1 [3,1,2].flter =[1]
  // 4 [3,1,2].flter =[]
  return (
    <div className=" m-3">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${pin._id}`)}
        className=" relative w-auto cursor-zoom-in  hover:shadow-lg  rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className=" rounded-lg w-full"
          alt="user post "
          src={urlFor(pin.image.asset.url).width(400).url()}
        />
        {postHovered && (
          <div
            className="flex flex-col justify-between absolute top-0 w-full h-full p-1 pt-3 pr-2 pb-3 z-50 "
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  // to make it downloadable
                  href={`${pin.image.asset.url}?dl=`}
                  download
                  //   for stopinhg further action
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline fontSize={22} />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className=" bg-red-500 font-bold opacity-70 hover:opacity-100 text-white py-2 px-5 rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(pin?._id);
                  }}
                  className=" bg-red-500 font-bold opacity-70 hover:opacity-100 text-white py-2 px-5 rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length} {savingPost ? "Saving" : "Save"}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {pin?.destination?.slice(8).length > 0 ? (
                <a
                  href={pin.destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  {" "}
                  <BsFillArrowUpRightCircleFill />
                  {pin?.destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {pin?.postedBy?._id === user?.sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(pin?._id);
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${pin?.postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={pin?.postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{pin?.postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
