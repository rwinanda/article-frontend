import z from "zod";

export const SchemaRegist = z.object({
    username: z.string().min(2, 'Username field cannot be empty'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    role: z.string().min(1, 'Role cannot be empty')
});

export const SchemaLogin = z.object({
    username: z.string().min(1, 'Please enter your username'),
    password: z.string().min(2, 'Please enter your password'),
});