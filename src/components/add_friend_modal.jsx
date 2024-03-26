import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import TextField from "./text_field";
import { Form, Formik } from "formik";
import { addFriendValidationSchema } from "../utilities/formValidation";
import socket from "../configs/socket";
import { useCallback, useContext, useState } from "react";
import { FriendContext } from "./pages/home";

const AddFriendModal = ({ isOpen, onClose }) => {
  const [error, setError] = useState();
  const { setFriendList } = useContext(FriendContext);

  const closeModal = useCallback(() => {
    setError("");
    onClose();
  }, [onClose]);

  const addFriend = (values) => {
    socket.emit(
      "add_friend",
      values.friendName,
      ({ errorMsg, done, newFriend }) => {
        if (done) {
          setFriendList((prev) => [newFriend, ...prev]);
          closeModal();
          return;
        }

        setError(errorMsg);
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton onClick={onClose} color="red" />
        <Formik
          initialValues={{ friendName: "" }}
          onSubmit={addFriend}
          validationSchema={addFriendValidationSchema}
        >
          <Form>
            <ModalBody>
              <TextField
                label="Username"
                placeholder="Enter friend's username"
                autoComplete="off"
                name="friendName"
              />

              {error && (
                <Text as="p" color="red.500" font="md" textAlign="center">
                  {error}
                </Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddFriendModal;

AddFriendModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
