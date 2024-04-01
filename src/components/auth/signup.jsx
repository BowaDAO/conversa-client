import { VStack, ButtonGroup, Button, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import TextField from "../text_field";
import { useNavigate } from "react-router-dom";
import { formValidationSchema } from "../../utilities/formValidation";
import { useContext } from "react";
import { AccountContext } from "../../contexts/user_context";
import { useState } from "react";

const Signup = () => {
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const submitSignupForm = async (values, helpers) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/signup`,

        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values }),
        }
      );

      if (!res || !res.ok || res.status >= 400) {
        const error = await res.json();
        setError({ ...error });
        return;
      }

      const data = await res.json();
      setUser({ ...data });
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      return;
    }

    helpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={formValidationSchema}
      onSubmit={submitSignupForm}
    >
      <Form>
        <VStack
          w={{ base: "90%", md: "550px" }}
          m="auto"
          justify="center"
          h="100vh"
          spacing="1rem"
        >
          <Heading>Create Account</Heading>

          <TextField
            label="Username"
            name="username"
            placeholder="Enter username"
            size="lg"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            size="lg"
          />

          <ButtonGroup pt="1rem">
            <Button colorScheme="teal" type="submit">
              Create Account
            </Button>

            <Button onClick={() => navigate("/")} type="button">
              Back
            </Button>
          </ButtonGroup>

          {error && <Text color="red">{error.message} </Text>}
        </VStack>
      </Form>
    </Formik>
  );
};

export default Signup;
