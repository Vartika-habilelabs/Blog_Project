import * as yup from "yup";
export const Validations = {
  firstname: yup
    .string()
    .max(15, "Length exceeds 15 characters")
    .required("Required"),
  lastname: yup
    .string()
    .max(15, "Length exceeds 15 characters")
    .required("Required"),
  username: yup
    .string()
    .max(15, "Length exceeds 15 characters")
    .required("Required"),
  dob: yup.string().required("Required"),
  email: yup
    .string()
    .required("Required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid Email"
    ),

  password: yup
    .string()
    .required("Required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "weak password"
    )
    .min(8, "Minimum 8 characters are required"),
};
