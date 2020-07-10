import * as yup from "yup";

export const isEmail = yup.string().email().required();
