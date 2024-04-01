import { VStack, ButtonGroup, Button, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import TextField from "../text_field";
import { useNavigate } from "react-router-dom";
import { formValidationSchema } from "../../utilities/formValidation";
import { useContext } from "react";
import { AccountContext } from "../../contexts/user_context";
import { useState } from "react";

const Login = () => {
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitLoginForm = async (values, helpers) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/signin`,

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

      setLoading(false);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }

    helpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={formValidationSchema}
      onSubmit={submitLoginForm}
    >
      <Form>
        <VStack
          w={{ base: "90%", md: "550px" }}
          m="auto"
          justify="center"
          h="100vh"
          spacing="1rem"
        >
          <Heading>Log In</Heading>

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
              Log In
            </Button>

            <Button type="button" onClick={() => navigate("/create-account")}>
              Create Account
            </Button>
          </ButtonGroup>

          {error && <Text color="red">{error.message} </Text>}

          {loading && <Text>Loading...</Text>}
        </VStack>
      </Form>
    </Formik>
  );
};

export default Login;
