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
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres!'),
  email: z.string().email(),
  telefone: z
    .string().max(12, 'O seu número de telefone deve conter no máximo 12 caracteres!')
    .min(11, 'O seu número de telefone deve conter no mínimo 11 caracteres!')
    .refine((value) => /^[0-9]*$/g.test(value)),
  senha: z.string().min(5, 'A senha deve ser maior que 5 caracteres!'),
  confirm_senha: z.string().min(5, 'A confirmação de senha deve ser maior que 5 caracteres!')
});

export default function Register() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await FormSchema.parseAsync(data);

      const { nome, email, telefone, senha, confirm_senha } = data;

      if(senha !== confirm_senha) {
        throw new Error('As senhas não coincidem!');
      }

      const response = await axios.post('/usuario/create', {
        nome, email, telefone, senha
      });

      toast.success(response.data.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Header />
      <main className="w-full h-3/5 flex justify-center items-center mt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 w-2/4 rounded flex flex-col gap-5">
          <h1 className="font-bold text-lg text-center">Registro</h1>
          <div>
            <Label htmlFor="nome" className="font-semibold">Nome</Label>
            <Input id="nome" type="text" { ... register('nome')}/>
          </div>
          <div>
            <Label htmlFor="email" className="font-semibold">E-mail</Label>
            <Input id="email" type="email" { ... register('email')}/>
          </div>
          <div>
            <Label htmlFor="telefone" className="font-semibold">Telefone</Label>
            <Input id="telefone" type="text" { ... register('telefone')}/>
          </div>
          <div>
            <Label htmlFor="senha" className="font-semibold">Senha</Label>
            <Input id="senha" type="password" { ... register('senha')}/>
          </div>
          <div>
            <Label htmlFor="confirm_senha" className="font-semibold">Confirme a senha</Label>
            <Input id="confirm_senha" type="password" { ... register('confirm_senha')}/>
          </div>
          <div>
            <Button>Registrar</Button>
          </div>
        </form>
      </main>
      <Toaster />
    </>
  )
}