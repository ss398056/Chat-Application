import React from "react";
import { useSelector } from "react-redux";

function Message({ message, otherUser }) {
  const user = useSelector((state) => state.user);

  return (
    <div>
      {String(message?.senderId) === String(user?.userProfile?._id) ? (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt={otherUser?.avatar}
                src={otherUser?.avatar}
              />
            </div>
          </div>
          <div className="chat-header">
            {otherUser?.fullName}
            <time className="text-xs opacity-50">{message?.createdAt}</time>
          </div>
          <div className="chat-bubble bg-[#293028]">{message?.message}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      ) : (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt={otherUser?.avatar}
                src={otherUser?.avatar}
              />
            </div>
          </div>
          <div className="chat-header">
            {otherUser?.fullName}
            <time className="text-xs opacity-50">{message?.createdAt}</time>
          </div>
          <div className="chat-bubble">{message?.message}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      )}
    </div>
  );
}

export default Message;
