import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import FriendList from "../friend_list";
import ChatRoom from "../chat_room";
import { createContext, useContext, useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import socketConnection from "../../configs/socket";
import { AccountContext } from "../../contexts/user_context";

export const FriendContext = createContext();
export const MessageContext = createContext();
export const SocketContext = createContext();

const Home = () => {
  const [friendList, setFriendList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [friendIndex, setFriendIndex] = useState(0);
  const { user } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => socketConnection(user).io);

  useEffect(() => {
    setSocket(() => socketConnection(user).io);
  }, [user]);

  useSocket(setFriendList, setMessages, socket);

  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <SocketContext.Provider value={{ socket }}>
        <Grid
          templateColumns="repeat(10, 1fr)"
          h="100vh"
          as={Tabs}
          onChange={(index) => setFriendIndex(index)}
        >
          <GridItem colSpan="3" borderRight="1px solid gray">
            <FriendList />
          </GridItem>

          <GridItem colSpan="7" maxH="100vh">
            <MessageContext.Provider value={{ messages, setMessages }}>
              <ChatRoom userid={friendList[friendIndex]?.userid} />
            </MessageContext.Provider>
          </GridItem>
        </Grid>
      </SocketContext.Provider>
    </FriendContext.Provider>
  );
};

export default Home;
