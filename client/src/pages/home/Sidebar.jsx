import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserThunk } from "../../store/slice/user/user.thunk";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {setSelectedUser} from '../../store/slice/user/user.slice.js'
import { getUserAllMessagesWithSingleUserThunk } from "../../store/slice/message/message.thunk.js";


function Sidebar() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  
  // console.log(user)
  // console.log(selectedUserId)

  useEffect(()=>{
    if(selectedUserId!==null){
      dispatch(setSelectedUser(selectedUserId))
      dispatch(getUserAllMessagesWithSingleUserThunk({receiverId:selectedUserId}))
    }
  },[selectedUserId, dispatch])

  const handleLogout = ()=>{
    dispatch(logoutUserThunk())
    toast.success("User logout successfully")  
    navigate("/login")
  }
  //console.log(searchUser)
  const handleInputChange = (e)=>{
    setSearchUser(e.target.value)
  }

  //Show serach user or all users
  const filteredUsers = user?.otherUsers?.filter((user) =>
    user.fullName.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-[20rem] w-full h-screen flex flex-col border-r border-white">
        <h1 className="bg-gray-900 p-2 font-semibold text-lg">
          Chat Application
        </h1>
        <div className="p-5">
          <label className="input">
            <input type="text" className="grow w-full" placeholder="Search" name="search" onChange={handleInputChange} />
            <FaSearch />
          </label>
        </div>
        <div className="h-full overflow-y-auto p-2">
          {filteredUsers?.map((user) => (
            <UserProfile
              key={user._id}
              userDetails={user}
              isSelected={selectedUserId === user._id}
              onClick={() => setSelectedUserId(user._id)}
            />
          ))}
        </div>

        <div className="flex justify-between gap-5 p-5 bg-gray-900">
          <div className="avatar avatar-online">
            <div className="w-12 rounded-full bg-base-100">
              <img src={user?.userProfile?.avatar} />
            </div>
          </div>
          <div className="flex w-[20rem] gap-5">
            <h2 className="line-clamp-1">{user?.userProfile?.fullName}</h2>
            <button className="btn btn-sm btn-primary" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Sidebar;
