import React, { useEffect, useState, useRef } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

function MessageContainer() {
  const router = useRouter();
  const { orderId } = router.query;
  const [cookies] = useCookies(["jwt"]);
  const jwt = cookies.jwt;
  const [recipientId, setRecipientId] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(
        `https://apiforspotfordev.onrender.com/messages/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setMessages(response.data.messages);
      setRecipientId(response.data.recipientId);
    };

    const getUserInfo = async () => {
      const response = await axios.get(`https://apiforspotfordev.onrender.com/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setUserInfo(response.data);
    };

    if (orderId && jwt) {
      getMessages();
      getUserInfo();
    }
  }, [orderId, jwt]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (messageText.length && recipientId) {
      try {
        const response = await axios.post(
          `https://apiforspotfordev.onrender.com/messages/${recipientId}`,
          {
            orderId: Number(orderId),
            text: messageText,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (response.status === 201) {
          setMessages([...messages, response.data]);
          setMessageText("");
        }
      } catch (error) {
        console.error("error sending message", error);
      }
    }
  };

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }

  return (
    <div className="h-[80vh]">
      <div className="max-h-[80vh] flex flex-col justify-center items-center">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 w-[80vw] border flex flex-col">
          <div className="mt-8">
            <div ref={messagesContainerRef} className="space-y-4 h-[50vh] overflow-y-auto pr-4 ">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    userInfo && message.senderId === userInfo.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg ${
                      userInfo && message.senderId === userInfo.id
                        ? "bg-blue-400 text-white"
                        : "bg-gray-100 text-gray-800"
                    } px-4 py-2 max-w-xs break-all`}
                  >
                    <p>{message.text}</p>
                    <span className="text-sm text-gray-600">
                      {formatTime(message.createdAt)}
                    </span>
                    <span>
                      {userInfo && message.senderId === userInfo.id && message.isRead && (
                        <BsCheckAll />
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="mt-8 flex"
          >
            <input
              type="text"
              className="rounded-full py-2 px-4 mr-2 w-full"
              placeholder="Type a message..."
              name="message"
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
            />
            <button
              type="submit"
              className="bg-blue-400 text-white rounded-full px-4 py-2"
            >
              <FaRegPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessageContainer;