import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import FriendList from "../friend_list";
import ChatRoom from "../chat_room";
import { createContext, useState } from "react";
import useSocket from "../../hooks/useSocket";

export const FriendContext = createContext();
export const MessageContext = createContext();

const Home = () => {
  const [friendList, setFriendList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [friendIndex, setFriendIndex] = useState(0);

  useSocket(setFriendList, setMessages);

  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
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
    </FriendContext.Provider>
  );
};

export default Home;
