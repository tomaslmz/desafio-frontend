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
import { useMutation } from '@tanstack/react-query';
import deleteProdutos from '@/data/Produtos/deleteProdutos';
import queryClient from '@/query/queryClient';
import getProdutos from '@/data/Produtos/getProdutos';
import { useSearchParams } from 'react-router-dom';

interface DeleteRequest {
	id: number
}

export default function DeleteDialog({ id }: DeleteRequest) {
	const [searchParams] = useSearchParams();

	const params = {
		descricao: searchParams.get('descricao'),
		categoria: searchParams.get('categoria'),
	};

	const { mutateAsync: deleteProdutosFn } = useMutation({
		mutationFn: deleteProdutos,
		async onSuccess() {
			const produtos = await getProdutos(params);
			queryClient.setQueryData(['produtos', params.descricao, params.categoria], produtos);
		},
	});

	async function handleDelete() {
		await deleteProdutosFn({ id });
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'destructive'}>
          Apagar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Você tem certeza que quer apagar este produto?</DialogTitle>
					<DialogDescription className="pb-3">
            Após confirmar, não será possível reverter
					</DialogDescription>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant={'destructive'} onClick={handleDelete}>Apagar</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button type="button">
                Cancelar
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}