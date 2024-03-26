import {
  Button,
  Divider,
  HStack,
  Heading,
  Tab,
  TabList,
  VStack,
  Text,
  Circle,
  useDisclosure,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { FriendContext } from "./pages/home";
import AddFriendModal from "./add_friend_modal";

const FriendList = () => {
  const { friendList } = useContext(FriendContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack py="1.5rem">
        <HStack justifyContent="space-evenly" w="100%">
          <Heading>Add Friend</Heading>

          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>

        <Divider />

        <VStack as={TabList} alignItems="start">
          {friendList?.map((friend, index) => {
            return (
              <HStack as={Tab} key={index.toString()}>
                <Circle
                  bg={friend.connected === "true" ? "green.700" : "red.500"}
                  w="12px"
                  h="12px"
                />
                <Text> {friend.username} </Text>
              </HStack>
            );
          })}
        </VStack>
      </VStack>

      <AddFriendModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default FriendList;
