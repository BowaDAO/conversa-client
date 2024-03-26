import PropTypes from "prop-types";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel>{label} </FormLabel>
      <Input as={Field} {...field} {...props} />

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
};

export default TextField;
