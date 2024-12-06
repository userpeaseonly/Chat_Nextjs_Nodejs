"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { io, Socket } from "socket.io-client";
import logout from "@/images/image.png";
import userIcon from "@/images/user.png";
import { useRouter } from "next/navigation";
import Message from "@/components/Message";

type ChatPropsType = {
  userEmail: string;
  chatRoom: string;
};

export default function Chat({ userEmail, chatRoom }: ChatPropsType) {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket>();
  const [onlineUsers, setOnlineUsers] = useState<{ userEmail: string; chatRoom: string; socketId: string }[]>([]);
  const [messages, setMessages] = useState<{ userEmail: string; message: string }[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loggedOutUser, setLoggedOutUser] = useState<string>();

  useEffect(() => {
    if (userEmail && chatRoom) {
      setSocket(io("http://localhost:3001"));
    }
  }, [userEmail, chatRoom]);

  useEffect(() => {
    if (socket) {
      socket.emit("newUserJoining", { userEmail, chatRoom });
    }
  }, [socket, userEmail, chatRoom]);

  useEffect(() => {
    if (socket) {
      socket.on("onlineUsers", (payload) => {
        if (Array.isArray(payload)) {
          setOnlineUsers(payload);
        } else {
          console.warn("Received unexpected data format for online users", payload);
          setOnlineUsers([]);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (payload) => {
        setMessages((prev) => [...prev, payload]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("logout", (payload) => {
        setLoggedOutUser(payload);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("userLeftMessage", (message) => {
        setMessages((prev) => [...prev, { userEmail: "SYSTEM Message", message }]);
      });
    }
  }, [socket]);

  const logoutHandler = () => {
    socket?.emit("userLeft", { userEmail, chatRoom });
    socket?.disconnect();
    router.push("/");
  };

  const sendMessage = () => {
    if (!message) return;
    socket?.emit("sendMessage", { userEmail, chatRoom, message });
    setMessage("");
  };

  const addEmoji = () => {
    setMessage((prev) => prev + "");
    const textarea = document.querySelector('input[type="text"]');
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      setMessage((prev) => prev.slice(0, start) + "😊" + prev.slice(end));
      setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <header className="border w-11/12 max-w-5xl rounded-lg shadow-lg bg-white flex">
        {/* Sidebar */}
        <aside className="border-r basis-[30%] p-4 bg-gray-50 overflow-y-auto">
          {Array.isArray(onlineUsers) &&
            onlineUsers.map((user) => (
              <article key={user.socketId} className="flex items-center gap-3 mb-3 p-2 hover:bg-gray-100 rounded-lg">
                <Image
                  className="rounded-full border border-gray-300"
                  src={userIcon}
                  alt="user icon"
                  width={30}
                  height={30}
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{user.userEmail}</span>
                  <span className="text-sm text-green-600">online</span>
                </div>
              </article>
            ))}
        </aside>

        <section className="basis-[70%] flex flex-col">
          <nav className="flex justify-between items-center p-4 border-b bg-white">
            <h1 className="text-lg font-semibold">
              Room Name: <span className="text-red-600">{chatRoom}</span>
            </h1>
            <button
              className="flex items-center gap-2 border border-red-600 px-3 py-1 rounded-lg text-red-600 hover:bg-red-50 transition"
              onClick={logoutHandler}
            >
              <Image src={logout} alt="logout" height={25} width={25} />
              <span>Logout</span>
            </button>
          </nav>

          <section className="flex-grow p-4 overflow-y-auto space-y-2 bg-gray-100">
            {messages.map((msg, index) => (
              <Message key={index} owner={msg.userEmail === userEmail} message={msg.message} email={msg.userEmail} />
            ))}
          </section>

          <footer className="p-4 bg-white border-t flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={addEmoji}
              className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
            >
              Add Emoji
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={sendMessage}
            >
              Send Message
            </button>
          </footer>
        </section>
      </header>
    </div>
  );
}
