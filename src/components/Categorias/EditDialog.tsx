import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import getCategorias from '@/data/Categorias/getCategorias';
import queryClient from '@/query/queryClient';
import { useSearchParams } from 'react-router-dom';
import updateCategorias from '@/data/Categorias/updateCategorias';

interface CategoriaRequest {
	id: number;
	descricao: string;
}

const schema = z.object({
	id: z.number(),
	descricao: z.string().min(3, { message: 'A descrição deve ser maior que 3 caracteres' }).max(100, { message: 'A descrição deve ser menor que 100 caracteres' }),
});


export default function EditDialog({ id, descricao }: CategoriaRequest) {
	const [searchParams] = useSearchParams();

	const params = {
		id: searchParams.get('id'),
		descricao: searchParams.get('descricao'),
	};

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			id,
			descricao
		}
	});

	const { mutateAsync: updateCategoriaFn } = useMutation({
		mutationFn: updateCategorias,
		async onSuccess() {
			const categorias = await getCategorias(params);
			queryClient.setQueryData(['categorias', params.id, params.descricao], categorias);
		}
	});

	const onSubmit: SubmitHandler<CategoriaRequest> = async (data) => {
		form.reset();

		await updateCategoriaFn(data);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'outline'}>Editar</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Criar categoria</DialogTitle>
					<DialogDescription>
					</DialogDescription>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
							<FormField
								control={form.control}
								name="descricao"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Descrição</FormLabel>
										<FormControl>
											<Textarea onChange={field.onChange} value={field.value}></Textarea>
										</FormControl>
										<FormDescription>
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='mt-5 flex flex-row justify-center align-center gap-3'>
								<Button type="submit">Editar</Button>
								<DialogClose asChild>
									<Button type="button" variant={'outline'}>
							Cancelar
									</Button>
								</DialogClose>
							</div>
						</form>
					</Form>
					<DialogFooter>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}