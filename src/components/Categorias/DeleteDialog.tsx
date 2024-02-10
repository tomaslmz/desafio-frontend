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
import { useSearchParams } from 'react-router-dom';
import deleteCategorias from '@/data/Categorias/deleteCategorias';
import { useMutation } from '@tanstack/react-query';
import getCategorias from '@/data/Categorias/getCategorias';
import queryClient from '@/query/queryClient';

interface DeleteRequest {
	id: number
}

export default function DeleteDialog({ id }: DeleteRequest) {
	const [searchParams] = useSearchParams();

	const params = {
		id: searchParams.get('id'),
		descricao: searchParams.get('descricao'),
	};

	const { mutateAsync: deleteCategoriasFn } = useMutation({
		mutationFn: deleteCategorias,
		async onSuccess() {
			const categorias = await getCategorias(params);
			queryClient.setQueryData(['categorias', params.id, params.descricao], categorias);
		},
	});

	async function handleDelete() {
		await deleteCategoriasFn({ id });
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
					<DialogTitle>Você tem certeza que quer apagar esta categoria?</DialogTitle>
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