import z from "zod";


export const signupSchema = z.object({
    name: z
      .string()
      .min(3, "O nome deve ter no mínimo 2 caracteres")
      .transform((name) => {
        return name
          .trim()
          .split(" ")
          .map((word)=> {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
        
          })
          .join(" ");
      }),
      email: z
         .string()
         .email("Email inválido.")
         .nonempty("O email é obrigatório.")
         .toLowerCase(),
      password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não corespodem",
        path:["confirmPassword"],
    });