import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";
const breakpointobi = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};
const MasonaryLayout = ({ pins }) => {
  return (
    <Masonry
      className=" flex animate-slide-fwd gap-5"
      breakpointCols={breakpointobi}
    >
      {pins?.map((pin) => {
        return <Pin key={pin._id} pin={pin} className="w-max" />;
      })}
    </Masonry>
  );
};

export default MasonaryLayout;
