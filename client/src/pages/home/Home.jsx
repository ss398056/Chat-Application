import React, { useEffect } from "react";
import MessageBox from "./MessageBox";
import Sidebar from "./Sidebar";
import ScreenLoader from "../loader/ScreenLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  getUserProfileThunk,
} from "../../store/slice/user/user.thunk";
import Banner from "../banner/Banner";
import { initializeSocket, setOnlineUsers } from "../../store/slice/socket/socket.slice";
import { setNewMessage } from "../../store/slice/message/message.slice";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const messageReducer = useSelector((state) => state.messageReducer);
  const {socket} = useSelector((state) => state.socketReducer);

  //console.log("online users",onlineUsers);

  useEffect(() => {
    if (user?.isAuthenticated) {
      dispatch(initializeSocket(user?.userProfile?._id));
      dispatch(getOtherUsersThunk());
      dispatch(getUserProfileThunk());
    }
  }, [user?.isAuthenticated]);

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers))
    });

    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage))
    });

    return ()=>{
      socket.close();
    }
    
  }, [socket]);

  return (
    <div className="flex">
      <Sidebar />
      {user?.selectedUser ? <MessageBox /> : <Banner />}
      <ScreenLoader loading={user?.screenLoading} />
    </div>
  );
}

export default Home;
