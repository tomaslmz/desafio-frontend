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
import { PlusCircle } from 'lucide-react';
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
import createCategoria from '@/data/Categorias/createCategoria';
import queryClient from '@/query/queryClient';
import { useSearchParams } from 'react-router-dom';

interface CategoriaRequest {
	descricao: string;
}

const schema = z.object({
	descricao: z.string().min(3, { message: 'A descrição deve ser maior que 3 caracteres' }).max(100, { message: 'A descrição deve ser menor que 100 caracteres' }),
});

export default function CreateDialog() {
	const [searchParams] = useSearchParams();

	const params = {
		id: searchParams.get('id'),
		descricao: searchParams.get('descricao'),
	};

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			descricao: ''
		}
	});

	const { mutateAsync: createCategoriaFn } = useMutation({
		mutationFn: createCategoria,
		async onSuccess() {
			const categorias = await getCategorias(params);
			queryClient.setQueryData(['categorias', params.id, params.descricao], categorias);
		}
	});

	const onSubmit: SubmitHandler<CategoriaRequest> = async (data) => {
		await createCategoriaFn({
			descricao: data.descricao,
		});

		form.reset();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle className='w-4 h-4 mr-2' />
					Criar
				</Button>
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
								<Button type="submit">Criar</Button>
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