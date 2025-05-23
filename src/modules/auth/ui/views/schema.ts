import z from "zod"

export const registerSchema=  z.object({
        email: z.string().email(),
        password: z.string(),
        username: z.string()
          .min(3, "Username must be atleast 3 character")
          .max(30, "Username must be under 30 characters")
          .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "Username must contain lowercase, number and hyphen. It should end with letter or a number")
          .refine((val) => !val.includes("--"),
            "Username should not have '--' ").
          transform((val) => val.toLowerCase())
      })

export const loginSchema=z.object({
        email: z.string().email(),
        password: z.string(),
      })