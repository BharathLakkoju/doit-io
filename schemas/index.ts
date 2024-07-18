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

export const taskSchema = z.object({
  title: z.string().min(1, {
    message: "Title can't be empty",
  }),
  description: z.string(),
  status: z.enum(["TOBE", "IN_PROGRESS", "COMPLETED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  tags: z.array(z.string()),
  isImportant: z.boolean(),
  userId: z.string().min(1, {
    message: "Zod Error",
  }),
});

export const SubtaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  status: z.enum(["TOBE", "IN_PROGRESS", "COMPLETED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  isImportant: z.boolean(),
  userId: z.string().min(1, { message: "User ID is required" }),
  parentTaskId: z.string().min(1, { message: "Parent Task ID is required" }),
});
