import { useContext, useEffect } from "react";
import socket from "../configs/socket";
import { AccountContext } from "../contexts/user_context";

const useSocket = (setFriendList, setMessages) => {
  const { setUser } = useContext(AccountContext);

  useEffect(() => {
    socket.connect();

    socket.on("friends", (friendList) => {
      setFriendList(friendList); //Loading all friends list when user starts the application.
    });

    socket.on("messages", (messages) => {
      setMessages(messages); //Loading all messages when user starts the application.
    });

    socket.on("dm", (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]); //DM sending between two users.
    });

    socket.on("connected", (connectedStatus, username) => {
      setFriendList((prevFriends) => {
        return [...prevFriends].map((friend) => {
          if (friend.username === username) {
            friend.connected = connectedStatus;
          }

          return friend;
        });
      });
    });

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });

    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friends");
      socket.off("messages");
    };
  }, [setUser, setFriendList, setMessages]);
};

export default useSocket;
