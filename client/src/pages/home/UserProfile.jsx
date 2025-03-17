import React from "react";
import { useSelector } from "react-redux";

function UserProfile(props) {
  const userData = props.userDetails;
  const isSelected = props.isSelected;
  const onClick = props.onClick;

  const {onlineUsers} = useSelector((state) => state.socketReducer);
  const isUserOnline = onlineUsers?.includes(userData?._id);

  //console.log("user is online",onlineUsers?.includes(userData?._id))

  return (
    <div
      className={`flex p-2 gap-2 cursor-pointer rounded-md ${
        isSelected ? "bg-base-300" : "hover:bg-base-200"
      }`}
      onClick={onClick}
    >
      <div className={`avatar avatar-${isUserOnline?'online':'offline'}`}>
        <div className="w-12 rounded-full bg-base-100">
          <img src={userData?.avatar} />
        </div>
      </div>
      <div className="">
        <h2 className="line-clamp-1">{userData.fullName}</h2>
        <div className="flex justify-between gap-5">
          <p>Recent Message</p>
          <p>4:20pm</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
