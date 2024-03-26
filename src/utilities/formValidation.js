import * as Yup from "yup";

export const formValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username is too short")
    .max(28, "Username is too long"),
  password: Yup.string()
    .required("Enter your passwod")
    .min(6, "Password is too short"),
});

export const addFriendValidationSchema = Yup.object({
  friendName: Yup.string()
    .required("Username is required")
    .min(6, "Invalid username")
    .max(28, "Invalid username"),
});
