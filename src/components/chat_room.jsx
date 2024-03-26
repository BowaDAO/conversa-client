import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
import { FriendContext, MessageContext } from "./pages/home";
import ChatBox from "./chat_box";
import PropTypes from "prop-types";

const ChatRoom = ({ userid }) => {
  const { friendList } = useContext(FriendContext);
  const { messages } = useContext(MessageContext);
  const buttonDiv = useRef(null);

  useEffect(() => {
    buttonDiv.current?.scrollIntoView();
  });

  return friendList.length > 0 ? (
    <VStack h="100%" justify="end">
      <TabPanels overflowY="scroll">
        {friendList?.map((friend) => {
          return (
            <VStack
              key={`chat:${friend.username}`}
              flexDir=" column-reverse"
              as={TabPanel}
              w="100%"
            >
              <div ref={buttonDiv} />

              {messages
                ?.filter(
                  (message) =>
                    message.to === friend.userid ||
                    message.from === friend.userid
                )
                .map((msg, index) => {
                  return (
                    <Text
                      m={
                        msg.to === friend.userid
                          ? "1rem 0 0 auto !important"
                          : "1rem auto 0 0 !important"
                      }
                      maxW="50%"
                      key={`msg:${friend.username}.${index}`}
                      fontSize="lg"
                      bg={msg.to === friend.userid ? "blue.100" : "gray.100"}
                      color="gray.800"
                      borderRadius="10px"
                      p="0.5rem 1rem"
                    >
                      {msg.content}
                    </Text>
                  );
                })}
            </VStack>
          );
        })}
      </TabPanels>

      <ChatBox userid={userid} />
    </VStack>
  ) : (
    <VStack justify="center" textAlign="center" p="5rem">
      <TabPanels>
        <TabPanel>
          <Text>No friend :) Click add friend to start chatting</Text>
        </TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default ChatRoom;

ChatRoom.propTypes = {
  userid: PropTypes.string,
};
