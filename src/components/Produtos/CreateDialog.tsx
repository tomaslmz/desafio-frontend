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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { PlusCircle } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { useMutation, useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import createProduto from '@/data/Produtos/createProduto';
import getCategorias from '@/data/Categorias/getCategorias';
import getProdutos from '@/data/Produtos/getProdutos';
import queryClient from '@/query/queryClient';
import { useSearchParams } from 'react-router-dom';

interface ProdutoRequest {
	codigo_barras: string;
	descricao: string;
	caracteristicas: string;
	preco: number;
	unidade_medida: string;
	categoria_id: number | null;	
}

const schema = z.object({
	codigo_barras: z.string().min(3, { message: 'O código de barras deve ser maior que 3 caracteres' }).max(20, { message: 'O código de barras deve ser menor que 20 caracteres' }),
	descricao: z.string().min(3, { message: 'A descrição deve ser maior que 3 caracteres' }).max(100, { message: 'A descrição deve ser menor que 100 caracteres' }),
	caracteristicas: z.string().min(3, { message: 'As características deve ser maior que 3 caracteres' }).max(100, { message: 'A característica do produto deve ser menor que 100 caracteres' }),
	preco: z.coerce.number().min(0, { message: 'O preço deve ser maior que 0!' }),
	unidade_medida: z.string().max(3, { message: 'A unidade de medida deve ter no máximo 3 caracteres!' }),
	categoria_id: z.coerce.number().min(1, { message: 'A categoria selecionada é inválida!' }).nullable()
});

export default function CreateDialog() {
	const [searchParams] = useSearchParams();

	const params = {
		descricao: searchParams.get('descricao'),
		categoria: searchParams.get('categoria'),
	};


	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			codigo_barras: '',
			descricao: '',
			caracteristicas: '',
			preco: 0,
			categoria_id: null
		}
	});

	const { data: categorias } = useQuery({
		queryKey: ['categorias'],
		queryFn: getCategorias
	});

	const { mutateAsync: createProductFn } = useMutation({
		mutationFn: createProduto,
		async onSuccess() {
			const produtos = await getProdutos(params);
			queryClient.setQueryData(['produtos', params.descricao, params.categoria], produtos);
		},
	});

	const onSubmit: SubmitHandler<ProdutoRequest> = async (data) => {
		try {
			console.log(data);
			form.reset();

			await createProductFn({
				codigo_barras: data.codigo_barras,
				descricao: data.descricao,
				caracteristicas: data.caracteristicas,
				preco: data.preco,
				unidade_medida: data.unidade_medida,
				categoria_id: data.categoria_id
			});

		} catch(err: any) {
			toast.error(err.response.data.message);
		}
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
								name="codigo_barras"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Código de barras</FormLabel>
										<FormControl>
											<Input type="text" onChange={field.onChange} value={field.value} />
										</FormControl>
										<FormDescription>
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
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
							<FormField
								control={form.control}
								name="caracteristicas"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Características</FormLabel>
										<FormControl>
											<Textarea onChange={field.onChange} value={field.value}></Textarea>
										</FormControl>
										<FormDescription>
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="preco"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Preço</FormLabel>
										<FormControl>
											<Input type="number" onChange={field.onChange} value={field.value} />
										</FormControl>
										<FormDescription>
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="unidade_medida"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Unidades de medida</FormLabel>
										<Select onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione uma unidade de medida" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='mm'>mm</SelectItem>
												<SelectItem value='cm'>cm</SelectItem>
												<SelectItem value='dm'>dm</SelectItem>
												<SelectItem value='m'>m</SelectItem>
												<SelectItem value='dam'>dam</SelectItem>
												<SelectItem value='hm'>hm</SelectItem>
												<SelectItem value='km'>km</SelectItem>
											</SelectContent>
										</Select>
										<FormDescription>
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="categoria_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Categorias</FormLabel>
										<Select onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione uma categoria" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{
													categorias && (
														categorias.map((categoria, index) => {
															return (
																<SelectItem value={categoria.id.toString()} key={index}>{categoria.descricao}</SelectItem>
															);
														})
													)
												}
											</SelectContent>
										</Select>
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