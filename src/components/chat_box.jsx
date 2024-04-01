import { Button, HStack, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useContext } from "react";
import { MessageContext, SocketContext } from "./pages/home";

const ChatBox = ({ userid }) => {
  const { setMessages } = useContext(MessageContext);
  const { socket } = useContext(SocketContext);

  const sendMessage = (values, helpers) => {
    const message = { to: userid, from: null, content: values.message };

    socket.emit("dm", message);

    setMessages((prevMessages) => [message, ...prevMessages]);

    helpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={Yup.object({ message: Yup.string().min(1) })}
      onSubmit={sendMessage}
    >
      <HStack as={Form} w="100%" pb="1rem" px="1.4rem">
        <Input
          as={Field}
          name="message"
          placeholder=""
          size="lg"
          autoComplete="off"
          overflowWrap="break-word"
        />

        <Button type="submit" size="lg" colorScheme="teal">
          Send
        </Button>
      </HStack>
    </Formik>
  );
};

export default ChatBox;

ChatBox.propTypes = {
  userid: PropTypes.string,
};
