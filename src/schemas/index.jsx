import * as Yup from "yup";

export const Step1FormSchema = Yup.object({
    fullName : Yup.string().min(2).max(25).required("Full Name is required"),
    email : Yup.string().email().required("email is required")
})