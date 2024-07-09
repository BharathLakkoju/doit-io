import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
});

export const SignupSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required!",
  }),
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters!",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters!",
  }),
});

export const commentSchema = z.object({
  email: z.string().email({
    message: "Email does not exist",
  }),
  text: z.string().min(1, {
    message: "Text can't be empty.",
  }),
});

// export const updateOrAddDataSchema = z.object({
//   name: z.string().min(1, {
//     message: "Name cannot be empty!",
//   }),

// });
