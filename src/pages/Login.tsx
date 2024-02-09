import Header from "@/components/Header"
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { z } from 'zod';
import axios from "@/services/axios";

interface IFormInput {
  nome: string,
  email: string,
  telefone: string,
  senha: string,
  confirm_senha: string
}

const FormSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(5, 'A senha deve ser maior que 5 caracteres!'),
});

export default function Login() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await FormSchema.parseAsync(data);

      const { email, senha } = data;

      const response = await axios.post('/token/create', {
        email, senha
      });

      toast.success(response.data.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <main className="w-full h-3/5 flex justify-center items-center mt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 w-2/4 rounded flex flex-col gap-5">
          <h1 className="font-bold text-lg text-center">Entrar</h1>
          <div>
            <Label htmlFor="email" className="font-semibold">E-mail</Label>
            <Input id="email" type="email" { ... register('email')}/>
          </div>
          <div>
            <Label htmlFor="senha" className="font-semibold">Senha</Label>
            <Input id="senha" type="password" { ... register('senha')}/>
          </div>
          <div>
            <Button>Entrar</Button>
          </div>
        </form>
      </main>
      <Toaster />
    </>
  )
}