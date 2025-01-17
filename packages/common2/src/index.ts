import { z } from 'zod';

const signupSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string()
});


const signinSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export { signinSchema, signupSchema }