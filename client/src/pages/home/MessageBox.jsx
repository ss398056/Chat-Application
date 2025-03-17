import React, { useEffect, useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAllMessagesWithSingleUserThunk,
  sendMessageThunk,
} from "../../store/slice/message/message.thunk";
function MessageBox() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const messageReducer = useSelector((state) => state.messageReducer);
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  //console.log("message reducer", messageReducer);

  const otherUser =
    user?.otherUsers?.find(
      (otherUser) => String(otherUser?._id) === String(user?.selectedUser)
    ) || null;
    const isUserOnline = onlineUsers?.includes(otherUser?._id);
  // console.log("other users",user?.otherUsers)
  // console.log("selected user",user?.selectedUser)

  // console.log("other user",otherUser)
  const messagesEndRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    //console.log(e.target.value);
  };

  //Send a message to the another user
  const handleSendMessage = (e) => {
    e.preventDefault();
    const data = { message, reciverId: user?.selectedUser };
    dispatch(sendMessageThunk(data));
    const receiverId = user?.selectedUser;
    dispatch(getUserAllMessagesWithSingleUserThunk({ receiverId }));
    //console.log(message, "Send successfully");
    setMessage("");
  };

  //manage chat Scrollbar
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageReducer?.conversation]);

  return (
    <div className=" max-w-[80rem] w-full h-screen flex flex-col">
      {/* Top Chat User Bar */}
      <div className="flex w-full p-3 gap-3 bg-gray-900">
        <div className={`avatar avatar-${isUserOnline?'online':'offline'}`}>
          <div className="w-12 rounded-full bg-base-100">
            <img src={otherUser?.avatar} />
          </div>
        </div>
        <div className="mt-2">
          <h2 className="line-clamp-1">{otherUser?.fullName}</h2>
        </div>
      </div>

      {/* Chat Bubble */}
      <div className="h-full overflow-y-auto p-5">
        {messageReducer?.conversation?.length > 0 ? (
          messageReducer.conversation.map((message) => (
            <Message
              key={message?._id}
              message={message}
              otherUser={
                String(message?.senderId) === String(user?.userProfile?._id)
                  ? user?.userProfile
                  : otherUser
              }
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Typing Box And Send Button*/}
      <div>
        <form onSubmit={handleSendMessage}>
          <div className=" flex p-5 gap-1">
            <input
              type="text"
              placeholder="Type a message"
              className="input w-full rounded-lg"
              onChange={handleInputChange}
              value={message}
            />
            <button
              className="btn btn-md btn-active rounded-lg"
              type="submit"
              // onClick={handleSendMessage}
              disabled={message.length <= 0 ? true : false}
            >
              <IoSendSharp />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MessageBox;
